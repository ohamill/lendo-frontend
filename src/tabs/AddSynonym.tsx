import {Alert, Button, Snackbar, Stack, TextField} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {addSynonym} from "../api/api.ts";
import {FormEvent, useState} from "react";
import {OperationStatus} from "../data/OperationStatus.ts";

interface AddSynonymProps {
    initialWord: string;
}

export default function AddSynonym({ initialWord }: AddSynonymProps) {
    const [ word, setWord ] = useState<string>(initialWord);
    const [ synonym, setSynonym ] = useState<string>("");
    const [ uploadStatus, setUploadStatus ] = useState<OperationStatus>(OperationStatus.None);

    function resetState() {
        setWord("");
        setSynonym("");
    }

    function submitSynonym(e: FormEvent) {
        e.preventDefault();
        addSynonym(word, synonym)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                setUploadStatus(OperationStatus.Success);
                resetState();
            })
            .catch(() => setUploadStatus(OperationStatus.Failed))
    }

    return (
        <>
            <form onSubmit={submitSynonym}>
                <Stack
                    spacing={2}
                >
                    <TextField
                        required
                        value={word}
                        onChange={e => setWord(e.target.value)}
                        label={"word"}
                        variant={"outlined"}
                        size={"small"}
                    />
                    <TextField
                        required
                        value={synonym}
                        onChange={e => setSynonym(e.target.value)}
                        label={"synonym"}
                        variant={"outlined"}
                        size={"small"}
                    />
                    <Button
                        variant={"contained"}
                        color={"primary"}
                        startIcon={<CheckCircleIcon/>}
                        type="submit"
                    >
                        Submit
                    </Button>
                </Stack>
            </form>
            {
                <Snackbar open={uploadStatus === OperationStatus.Failed} autoHideDuration={3000} onClose={() => setUploadStatus(OperationStatus.None)}>
                    <Alert
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Failed to create synonyms, please try again.
                    </Alert>
                </Snackbar>
            }
            {
                <Snackbar open={uploadStatus === OperationStatus.Success} autoHideDuration={3000} onClose={() => setUploadStatus(OperationStatus.Success)}>
                    <Alert
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Synonyms created successfully!
                    </Alert>
                </Snackbar>
            }
        </>
    )
}