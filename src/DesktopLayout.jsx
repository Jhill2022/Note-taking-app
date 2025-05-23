import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AllNotes from "./AllNotes";
import NoteTags from "./NoteTags";
import AddNote from "./AddNote";
import NoteDetail from "./NoteDetail";
import Logo from "./Logo";

export default function DesktopLayout({ notes, setNotes }) {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedTag, setSelectedTag] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-gray-100 flex">
        <div className="bg-white p-4 w-[272px]">
          {" "}
          <Logo />
          <NoteTags
            notes={notes}
            setActiveTab={setActiveTab}
            setSelectedTag={setSelectedTag}
          />
        </div>
        <div className="flex-1 bg-white p-4 shadow-md rounded min-h-screen">
          {selectedTag ? (
            // ✅ show filtered tag view
            <>
              <button
                onClick={() => setSelectedTag(null)}
                className="text-sm text-[#525866] hover:underline flex items-center mb-3"
              >
                <img
                  src="../src/assets/images/icon-arrow-left.svg"
                  alt=""
                  className="mr-1"
                />
                Go Back
              </button>
              <h2 className="text-xl font-semibold mb-2">
                Notes Tagged:{" "}
                <span className="text-blue-600">{selectedTag}</span>
              </h2>
              <p className="text-sm mb-2">
                All notes with the "{selectedTag}" tag are shown here.
              </p>
              {notes
                .filter((note) => note.tags.includes(selectedTag))
                .map((note) => (
                  <div
                    key={note.id}
                    onClick={() => {
                      setActiveTab(null);
                      // 💡 clear selectedTag so the detail view shows up correctly
                      navigate(`/note/${note.id}`);
                    }}
                    className="block border-b border-[#E0E4EA] py-2 cursor-pointer last:border-b-0"
                  >
                    <div className="font-semibold text-[16px]">
                      {note.title}
                    </div>
                    <div className="flex gap-2 mt-1">
                      {note.tags.map((tag) => (
                        <div
                          key={tag}
                          className="bg-[#E0E4EA] text-[#0E121B] text-sm px-1.5 py-0.5 rounded-sm"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                    <div className="mt-1 font-normal text-sm text-gray-500">
                      {new Date(note.lastEdited).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                ))}
            </>
          ) : (
            // ✅ default to All Notes
            <>
              <h2 className="text-xl font-bold mb-2">All Notes</h2>
              <AllNotes notes={notes} setActiveTab={setActiveTab} />
            </>
          )}
        </div>
        <div className="flex-1 bg-white p-4 shadow-sm rounded overflow-y-auto">
          <Routes>
            <Route
              path="/note/:id"
              element={<NoteDetail notes={notes} setNotes={setNotes} />}
            />
            <Route
              path="/new"
              element={<AddNote notes={notes} setNotes={setNotes} />}
            />
            <Route
              path="*"
              element={
                <p className="text-gray-500">Select a note to view details</p>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
