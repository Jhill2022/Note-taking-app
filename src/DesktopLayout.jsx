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
      <div className=" flex min-h-screen">
        {/* Sidebar */}
        <div className="bg-white p-4 w-[272px] border-r border-[#E0E4EA]">
          <Logo />
          <NoteTags
            notes={notes}
            setActiveTab={setActiveTab}
            setSelectedTag={setSelectedTag}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* 🔍 Search input above both panels */}
          <div className="flex justify-between items-center py-5 px-10 border-b border-[#E0E4EA]">
            <h2 className="text-xl font-bold">
              {activeTab === "archive"
                ? "Archive"
                : selectedTag
                ? `Notes Tagged: ${selectedTag}`
                : "All Notes"}
            </h2>
            <div className="relative ">
              <input
                type="text"
                placeholder="Search notes..."
                className="w-full pl-10 pr-4 py-1 border rounded-lg shadow-sm focus:outline-none "
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="20"
                height="20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Notes & Routes side-by-side */}
          <div className="flex">
            {/* Left: Notes List */}
            <div className="flex-1 bg-white px-4 pt-4 min-h-screen">
              <div className="px-5">
                <button
                  className="w-full bg-[#335CFF] text-white rounded-[8px] px-4 py-2 font-medium"
                  onClick={() => navigate("/new")}
                >
                  + Create New Note
                </button>
              </div>
              {selectedTag ? (
                <>
                  <p className="text-sm mb-2 mt-2 px-5">
                    All notes with the "{selectedTag}" tag are shown here.
                  </p>

                  {notes
                    .filter((note) => note.tags.includes(selectedTag))
                    .map((note) => (
                      <div
                        key={note.id}
                        onClick={() => {
                          setActiveTab(null);
                          navigate(`/note/${note.id}`);
                        }}
                        className="block border-b border-[#E0E4EA] py-2  px-5 cursor-pointer last:border-b-0"
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
                          {new Date(note.lastEdited).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </div>
                    ))}
                </>
              ) : (
                <>
                  <AllNotes notes={notes} setActiveTab={setActiveTab} />
                </>
              )}
            </div>

            {/* Right: Routes */}
            <div className="flex-2 bg-white px-4 border-l border-[#E0E4EA] overflow-y-auto ">
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
                    <p className="text-gray-500">
                      Select a note to view details
                    </p>
                  }
                />
              </Routes>
            </div>
            <div className="flex-1 border-l border-[#E0E4EA]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
