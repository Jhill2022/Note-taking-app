import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NoteTags = ({ notes, setActiveTab }) => {
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState(null);

  const uniqueTags = [...new Set(notes.map((note) => note.tags).flat())].sort();

  const filteredNotes = selectedTag
    ? notes.filter((note) => note.tags.includes(selectedTag))
    : [];

  return (
    <div className="px-4 pt-5">
        {selectedTag && (
  <button
    onClick={() => setSelectedTag(null)}
    className="text-sm text-[#525866] hover:underline flex items-center"
  >
    <img src="../src/assets/images/icon-arrow-left.svg" alt="" />Go Back
  </button>
)}
      {selectedTag ? (
        <div className="mt-3">
          <h2 className="text-xl font-semibold mb-2">
            Notes Tagged: <span className="text-blue-600">{selectedTag}</span>
          </h2>
          <p className="text-sm">All notes with the "{selectedTag}" tag are shown here.</p>
          {filteredNotes.map((note, index) => (
            <Link
              key={note.id}
              to={`/note/${note.id}`}
              onClick={() => setActiveTab(null)}
              className="block border-b border-[#E0E4EA] mt-3 last:border-b-0 px-2"
            >
              <div>
                <div className="font-semibold text-[16px]">{note.title}</div>
                <div className="flex gap-2 mt-3">
                  {note.tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="bg-[#E0E4EA] text-[#0E121B] text-sm px-1.5 py-0.5 rounded-sm"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="mt-2 mb-2 font-normal text-sm">
                  {new Date(note.lastEdited).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-3">Tags</h1>
          {uniqueTags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-2 mt-4 pb-3 border-b border-[#E0E4EA] last:border-b-0 cursor-pointer hover:text-blue-600"
              onClick={() => setSelectedTag(tag)}
            >
              <img src="../src/assets/images/icon-tag.svg" alt="" />
              <span>{tag}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteTags;
