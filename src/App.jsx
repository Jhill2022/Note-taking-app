import React, { useState } from "react";
import AllNotes from "./AllNotes";
import NavBar from "./NavBar";
import Data from "../data.json";
import Plus from "../src/assets/images/icon-plus.svg";

function App() {
  const [notes, setNotes] = useState(Data.notes);
  const [activeTab, setActiveTab] = useState("home");
  return (
    <div>
      <AllNotes notes={notes} />
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab}/>
    </div>
  );
}

export default App;
