import {Box, Stack, Tab, Typography} from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AddWord from "./AddWord.tsx";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import SearchWord from "./SearchWord.tsx";
import {TabAction} from "./data/Action.ts";
import AddSynonym from "./AddSynonym.tsx";
import {useState} from "react";

interface LendoTabsProps {
    value: TabAction;
    setValue: (ta: TabAction) => void;
}

export default function LendoTabs({ value, setValue }: LendoTabsProps) {
    const [ initialWord, setInitialWord ] = useState<string>("");

    function onAddSynonym(synonym: string) {
        setInitialWord(synonym);
        setValue(TabAction.AddSynonym);
    }

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={(_, v) => setValue(v)} aria-label="lab API tabs example">
                    <Tab label={
                        <Stack
                            direction={"row"}
                            spacing={1}
                            alignItems={"center"}
                            justifyContent={"center"}
                        >
                            <AddCircleIcon />
                            <Typography variant={"body2"}>
                                New Word
                            </Typography>
                        </Stack>
                    } value={TabAction.AddWord} />
                    <Tab label={
                        <Stack
                            direction={"row"}
                            spacing={1}
                            alignItems={"center"}
                            justifyContent={"center"}
                        >
                            <EditIcon />
                            <Typography variant={"body2"}>
                                New Synonym
                            </Typography>
                        </Stack>
                    } value={TabAction.AddSynonym} />
                    <Tab label={
                        <Stack
                            direction={"row"}
                            spacing={1}
                            alignItems={"center"}
                            justifyContent={"center"}
                        >
                            <SearchIcon />
                            <Typography variant={"body2"}>
                                Search
                            </Typography>
                        </Stack>
                    } value={TabAction.SearchWords} />
                </TabList>
            </Box>
            <TabPanel value={TabAction.AddWord}>
                <AddWord />
            </TabPanel>
            <TabPanel value={TabAction.AddSynonym}>
                <AddSynonym initialWord={initialWord} />
            </TabPanel>
            <TabPanel value={TabAction.SearchWords}>
                <SearchWord onAddSynonym={onAddSynonym} />
            </TabPanel>
        </TabContext>
    )
}