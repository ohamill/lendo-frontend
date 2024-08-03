import {Chip} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

interface SynonymChipProps {
    word: string;
    onCancel: () => void;
}

export default function SynonymChip({ word, onCancel }: SynonymChipProps) {
    return (
        <Chip
            icon={
                <div
                    onClick={() => onCancel()}
                    style={{
                        cursor: "pointer"
                    }}
                >
                    <CancelIcon />
                </div>
            }
            label={word}
        />
    )
}