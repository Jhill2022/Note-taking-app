import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllNotes from "./AllNotes";
import { v4 as uuidv4 } from "uuid";
import Logo from "./Logo";
import NavBar from "./NavBar";
import Data from "../data.json";
import NoteDetail from "./NoteDetail";

const notesWithIds = Data.notes.map((note, index) => ({
  ...note,
  id: index.toString(), // or use UUIDs if preferred
}));

function App() {
  const [notes, setNotes] = useState(notesWithIds);
  const [activeTab, setActiveTab] = useState("home");

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Logo />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<AllNotes notes={notes}  setActiveTab={setActiveTab}/>} />
            <Route path="/note/:id" element={<NoteDetail notes={notes} />} />
          </Routes>
        </div>

        <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </Router>
  );
}

export default App;
