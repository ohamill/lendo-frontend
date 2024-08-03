import {Autocomplete, Button, Divider, Stack, TextField} from "@mui/material";
import SynonymChip from "./SynonymChip.tsx";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {addSynonyms, getWords} from "./api/api.ts";
import {useEffect, useState} from "react";

interface AddSynonymProps {
    initialWord: string;
}

export default function AddSynonym({ initialWord }: AddSynonymProps) {
    const [ word, setWord ] = useState<string | null>(initialWord);
    const [ words, setWords ] = useState<string[]>([]);
    const [ synonymValue, setSynonymValue ] = useState<string>("");
    const [ synonyms, setSynonyms ] = useState<Set<string>>(new Set());

    useEffect(() => {
        getWords()
            .then(words => setWords(words))
    }, []);

    function resetState() {
        setWord(null);
        setSynonymValue("");
        setSynonyms(new Set());
    }

    return (
        <Stack
            spacing={2}
            divider={<Divider/>}
        >
            <Autocomplete
                renderInput={params => <TextField {...params} label="Word" />}
                options={words}
                value={word}
                onChange={(_, value) => setWord(value)}
            />
            <Stack spacing={1}>
                <TextField
                    label={"synonyms"}
                    variant={"outlined"}
                    size={"small"}
                    value={synonymValue}
                    onChange={e => setSynonymValue(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === "Enter" && synonymValue !== "") {
                            console.log(`are we here? synonymValue: ${synonymValue}`);
                            setSynonyms(prevSynonyms => {
                                return prevSynonyms.add(synonymValue);
                            })
                            console.log(JSON.stringify(synonyms.values()));
                            setSynonymValue("");
                        }
                    }}
                />
                <Stack direction={"row"} spacing={1}>
                    {
                        Array.from(synonyms.values()).map((synonym, i) => {
                            return (
                                <SynonymChip
                                    key={i}
                                    word={synonym}
                                    onCancel={() => {
                                        setSynonyms(prevSynonyms => {
                                            prevSynonyms.delete(synonym);
                                            return new Set(prevSynonyms)
                                        })
                                    }}
                                />
                            )
                        })
                    }
                </Stack>
            </Stack>
            <Button
                variant={"contained"}
                color={"primary"}
                startIcon={<CheckCircleIcon/>}
                onClick={() => {
                    if (word !== null) {
                        console.log(`synonyms: ${JSON.stringify(synonyms.values())}`);
                        addSynonyms(word!, Array.from(synonyms))
                            .then(() => resetState())
                    }
                }}
            >
                Submit
            </Button>
        </Stack>
    )
}