import {Alert, Autocomplete, Button, Divider, Snackbar, Stack, TextField, Tooltip} from "@mui/material";
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
    const [ fetchWordsLoading, setFetchWordsLoading ] = useState<boolean>(true);
    const [ fetchWordsError, setFetchWordsError ] = useState<boolean>(false);
    const [ autocompleteDisabled, setAutocompleteDisabled ] = useState<boolean>(false);
    const [ uploadError, setUploadError ] = useState<boolean>(false);
    const [ uploadSuccess, setUploadSuccess ] = useState<boolean>(false);

    useEffect(() => {
        getWords()
            .then(resp => setWords(resp.words))
            .catch(() => {
                setFetchWordsError(true);
                setAutocompleteDisabled(true);
            })
            .finally(() => setFetchWordsLoading(false))
    }, []);

    function resetState() {
        setWord(null);
        setSynonymValue("");
        setSynonyms(new Set());
    }

    return (
        <>
            <Stack
                spacing={2}
                divider={<Divider/>}
            >
                <Tooltip
                    title="Something went wrong while fetching words. Please refresh the page and try again."
                    arrow
                    disableHoverListener={!autocompleteDisabled}
                    disableTouchListener={!autocompleteDisabled}
                    disableFocusListener={!autocompleteDisabled}
                >
                    <Autocomplete
                        renderInput={params => <TextField {...params} label="Word" />}
                        options={words}
                        value={word}
                        onChange={(_, value) => setWord(value)}
                        loading={fetchWordsLoading}
                        disabled={autocompleteDisabled}
                        disabledItemsFocusable={false}
                    />
                </Tooltip>
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
                                    return prevSynonyms.add(synonymValue);
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
                    onClick={() => {
                        if (word !== null) {
                            addSynonyms(word!, Array.from(synonyms))
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error(response.statusText);
                                    }
                                    setUploadSuccess(true);
                                    resetState();
                                })
                                .catch(() => setUploadError(true))
                        }
                    }}
                >
                    Submit
                </Button>
            </Stack>
            {
                <Snackbar open={fetchWordsError} autoHideDuration={3000} onClose={() => setFetchWordsError(false)}>
                    <Alert
                        onClose={() => setFetchWordsError(false)}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Failed to fetch all words, please refresh the page and try again.
                    </Alert>
                </Snackbar>
            }
            {
                <Snackbar open={uploadError} autoHideDuration={3000} onClose={() => setUploadError(false)}>
                    <Alert
                        onClose={() => setUploadError(false)}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Failed to create synonym, please try again.
                    </Alert>
                </Snackbar>
            }
            {
                <Snackbar open={uploadSuccess} autoHideDuration={3000} onClose={() => setUploadSuccess(false)}>
                    <Alert
                        onClose={() => setUploadSuccess(false)}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Synonym created successfully!
                    </Alert>
                </Snackbar>
            }
        </>
    )
}