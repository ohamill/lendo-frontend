import {Box, IconButton, ListItem, ListItemButton, ListItemText, Tooltip} from "@mui/material";
import {FixedSizeList, ListChildComponentProps} from "react-window";
import EditIcon from '@mui/icons-material/Edit';

interface SynonymListProps {
    synonyms: string[];
    onClick: (s: string) => void;
    onAddSynonym: (s: string) => void;
}

export default function SynonymList({ synonyms, onClick, onAddSynonym }: SynonymListProps) {
    return (
        <Box
            sx={{ height: 400, bgcolor: 'background.paper' }}
        >
            <FixedSizeList
                height={400}
                width={360}
                itemSize={46}
                itemCount={synonyms.length}
                overscanCount={5}
                itemData={{
                    synonyms,
                    onClick,
                    onAddSynonym,
                }}
            >
                {renderData}
            </FixedSizeList>
        </Box>
    )
}

function renderData(props: ListChildComponentProps<{synonyms: string[], onClick: (s: string) => void, onAddSynonym: (s: string) => void}>) {
    const { index, style, data } = props;

    return (
        <ListItem
            style={style}
            key={index}
            component="div"
            disablePadding
            secondaryAction={
                <Tooltip
                    title="Add synonym"
                    arrow
                    placement="right"
                >
                    <IconButton
                        edge="end"
                        color="info"
                        aria-label="add synonym"
                        onClick={() => data.onAddSynonym(data.synonyms[index])}
                    >
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            }
        >
            <ListItemButton onClick={() => data.onClick(data.synonyms[index])}>
                <ListItemText primary={data.synonyms[index]} />
            </ListItemButton>
        </ListItem>
    );
}