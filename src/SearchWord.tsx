import {useState} from "react";
import {Alert, CircularProgress, Divider, Snackbar, Stack, TextField, Typography} from "@mui/material";
import {getSynonyms} from "./api/api.ts";
import SynonymList from "./SynonymList.tsx";
import {OperationStatus} from "./data/OperationStatus.ts";

interface SearchWordProps {
    onAddSynonym: (s: string) => void;
}

export default function SearchWord({ onAddSynonym }: SearchWordProps) {
    const [ searchTerm, setSearchTerm ] = useState<string>("");
    const [ searchStatus, setSearchStatus ] = useState<OperationStatus>(OperationStatus.None);
    const [ synonyms, setSynonyms ] = useState<string[]>([]);

    function fetchSynonyms(word: string) {
        setSearchStatus(OperationStatus.Loading);
        getSynonyms(word)
            .then(resp => {
                setSynonyms(resp.synonyms);
                setSearchStatus(OperationStatus.Success);
            })
            .catch(() => setSearchStatus(OperationStatus.Failed))
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
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        fetchSynonyms(searchTerm);
                    }}
                >
                    <TextField
                        label={"word"}
                        variant={"outlined"}
                        size={"small"}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }}
                        required
                    />
                </form>
                {
                    searchStatus === OperationStatus.Success && (
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
                    searchStatus === OperationStatus.Loading && (
                        <CircularProgress/>
                    )
                }
            </Stack>
            {
                <Snackbar open={searchStatus === OperationStatus.Failed} autoHideDuration={3000} onClose={() => setSearchStatus(OperationStatus.None)}>
                    <Alert
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