import {Alert, Button, Snackbar, Stack, TextField} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {FormEvent, useState} from "react";
import {createWord} from "../api/api.ts";
import {OperationStatus} from "../data/OperationStatus.ts";

export default function AddWord() {
    const [ word, setWord ] = useState<string>("");
    const [ uploadStatus, setUploadStatus ] = useState<OperationStatus>(OperationStatus.None);

    function submitWord(e: FormEvent) {
        e.preventDefault();
        createWord(word)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error(resp.statusText);
                }
                setUploadStatus(OperationStatus.Success);
            })
            .catch(() => setUploadStatus(OperationStatus.Failed))
            .finally(() => setWord(""))
    }

    return (
        <>
            <form onSubmit={submitWord}>
                <Stack spacing={2}>
                    <TextField
                        label={"word"}
                        variant={"outlined"}
                        size={"small"}
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        required
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
                        Failed to create word, please try again.
                    </Alert>
                </Snackbar>
            }
            {
                <Snackbar open={uploadStatus === OperationStatus.Success} autoHideDuration={3000} onClose={() => setUploadStatus(OperationStatus.None)}>
                    <Alert
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Word created successfully!
                    </Alert>
                </Snackbar>
            }
        </>
    )
}