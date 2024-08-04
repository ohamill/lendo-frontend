import {useState} from "react";
import {Alert, CircularProgress, Divider, Snackbar, Stack, TextField, Typography} from "@mui/material";
import {getSynonyms} from "./api/api.ts";
import SynonymList from "./SynonymList.tsx";

interface SearchWordProps {
    onAddSynonym: (s: string) => void;
}

export default function SearchWord({ onAddSynonym }: SearchWordProps) {
    const [ searchTerm, setSearchTerm ] = useState<string>("");
    const [ searchError, setSearchError ] = useState<boolean>(false);
    const [ searchingSynonyms, setSearchingSynonyms ] = useState<boolean>(false);
    const [ synonyms, setSynonyms ] = useState<string[]>([]);
    const showSynonyms = synonyms.length > 0;

    function fetchSynonyms(word: string) {
        setSearchingSynonyms(true);
        getSynonyms(word)
            .then(resp => setSynonyms(resp.synonyms))
            .catch(() => setSearchError(true))
            .finally(() => setSearchingSynonyms(false))
    }

    return (
        <>
            <Stack
                direction="column"
                spacing={2}
                divider={
                    <Divider textAlign={"left"}>
                        <Typography variant={"button"}>
                            SYNONYMS
                        </Typography>
                    </Divider>
                }
            >
                <TextField
                    label={"word"}
                    variant={"outlined"}
                    size={"small"}
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            fetchSynonyms(searchTerm);
                        }
                    }}
                />
                {
                    showSynonyms && (
                        <SynonymList
                            synonyms={synonyms}
                            onClick={(s: string) => {
                                setSearchTerm(() => {
                                    fetchSynonyms(s);
                                    return s;
                                });
                            }}
                            onAddSynonym={onAddSynonym}
                        />
                    )
                }
                {
                    searchingSynonyms && (
                        <CircularProgress />
                    )
                }
            </Stack>
            {
                <Snackbar open={searchError} autoHideDuration={3000} onClose={() => setSearchError(false)}>
                    <Alert
                        onClose={() => setSearchError(false)}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Something went wrong while searching, please try again.
                    </Alert>
                </Snackbar>
            }
        </>
    )
}