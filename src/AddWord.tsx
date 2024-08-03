import {Button, Divider, Stack, TextField} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useState} from "react";
import SynonymChip from "./SynonymChip.tsx";
import {createWord} from "./api/api.ts";

export default function AddWord() {
    const [ word, setWord ] = useState<string>("");
    const [ wordError, setWordError ] = useState<boolean>(false);
    const [ synonymValue, setSynonymValue ] = useState<string>("");
    const [ synonyms, setSynonyms ] = useState<Set<string>>(new Set());

    function resetState() {
        setWord("");
        setWordError(false);
        setSynonymValue("");
        setSynonyms(new Set());
    }

    return (
        <Stack
            spacing={2}
            divider={<Divider/>}
        >
            <TextField
                label={"word"}
                variant={"outlined"}
                size={"small"}
                value={word}
                onChange={(e) => {
                    if (e.target.value !== "") {
                        setWordError(false);
                    }
                    setWord(e.target.value)
                }}
                error={wordError}
                helperText={wordError ? "Word cannot be blank" : null}
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
                            setSynonyms(prevSynonyms => {
                                prevSynonyms.add(synonymValue);
                                return prevSynonyms;
                            })
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
                onClick={async () => {
                    if (word === "") {
                        setWordError(true);
                        return;
                    }
                    createWord(word, Array.from(synonyms))
                        .then(() => {
                            resetState();
                        })
                        .catch(error => {
                            console.error(error); // TODO Handle error
                        })
                }}
            >
                Submit
            </Button>
        </Stack>
    )
}