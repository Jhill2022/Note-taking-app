// src/components/TagNotesPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const TagNotesPage = ({ notes }) => {
  const { tag } = useParams();
  const navigate = useNavigate();

  const filteredNotes = notes.filter((note) => note.tags.includes(tag));

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
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
        Notes Tagged: <span className="text-blue-600">{tag}</span>
      </h2>
      <p className="text-sm mb-2">
        All notes with the "{tag}" tag are shown here.
      </p>
      {filteredNotes.map((note) => (
        <div
          key={note.id}
          onClick={() => {
            // 💡 clear selectedTag so the detail view shows up correctly
            navigate(`/note/${note.id}`);
          }}
          className="block border-b border-[#E0E4EA] py-2 cursor-pointer"
        >
          <div className="font-semibold text-[16px]">{note.title}</div>
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
    </div>
  );
};

export default TagNotesPage;
