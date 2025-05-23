// MobileLayout.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AllNotes from "./AllNotes";
import NoteTags from "./NoteTags";
import AddNote from "./AddNote";
import NoteDetail from "./NoteDetail";
import TagNotesPage from "./TagNotesPage";
import AddButton from "./AddButton";
import NavBar from "./NavBar";
import Logo from "./Logo";

export default function MobileLayout({
  notes,
  setNotes,
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Logo />

      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={<AllNotes notes={notes} setActiveTab={setActiveTab} />}
          />
          <Route
            path="/note/:id"
            element={<NoteDetail notes={notes} setNotes={setNotes} />}
          />
          <Route
            path="/new"
            element={<AddNote notes={notes} setNotes={setNotes} />}
          />
          <Route
            path="/tags"
            element={<NoteTags notes={notes} setActiveTab={setActiveTab} />}
          />
          <Route path="/tags/:tag" element={<TagNotesPage notes={notes} />} />
        </Routes>
      </div>

      <AddButton setActiveTab={setActiveTab} />
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
