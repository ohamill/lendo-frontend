import {useEffect, useState} from "react";
import {Divider, Stack, TextField, Typography} from "@mui/material";
import {getSynonyms} from "./api/api.ts";
import SynonymList from "./SynonymList.tsx";

interface SearchWordProps {
    onAddSynonym: (s: string) => void;
}

export default function SearchWord({ onAddSynonym }: SearchWordProps) {
    const [ searchTerm, setSearchTerm ] = useState<string>("");
    const [ synonyms, setSynonyms ] = useState<string[]>([]);
    const showSynonyms = synonyms.length > 0;

    useEffect(() => {
        getSynonyms(searchTerm)
            .then(synonyms => setSynonyms(synonyms))
            .catch(() => setSynonyms([]))
    }, [searchTerm]);

    return (
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
                    setSearchTerm(e.target.value)
                }}
            />
            {
                showSynonyms && (
                    <SynonymList
                        synonyms={synonyms}
                        onClick={(s: string) => setSearchTerm(s)}
                        onAddSynonym={onAddSynonym}
                    />
                )
            }
        </Stack>
    )
}