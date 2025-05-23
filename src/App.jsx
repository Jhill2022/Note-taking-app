// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Data from "../data.json";
import MobileLayout from "./MobileLayout";
import DesktopLayout from "./DesktopLayout";

const notesWithIds = Data.notes.map((note, index) => ({
  ...note,
  id: index.toString(),
}));

function App() {
  const [notes, setNotes] = useState(notesWithIds);
  const [activeTab, setActiveTab] = useState("home");

  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Router>
      {isMobile ? (
        <MobileLayout
          notes={notes}
          setNotes={setNotes}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ) : (
        <DesktopLayout notes={notes} setNotes={setNotes} />
      )}
    </Router>
  );
}

export default App;