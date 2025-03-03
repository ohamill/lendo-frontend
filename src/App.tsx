import './App.css'
import LendoTabs from "./tabs/LendoTabs.tsx";
import {useState} from "react";
import {TabAction} from "./data/Action.ts";

function App() {
    const [ value, setValue ] = useState<TabAction>(sessionStorage.getItem("activeTab") as TabAction ?? TabAction.AddWord);

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        background: "#FFF",
    }}>
        <LendoTabs value={value} setValue={(ta: TabAction) => setValue(ta)} />
    </div>
  )
}

export default App
