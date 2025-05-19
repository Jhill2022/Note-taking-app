import React from "react";
import { Link } from "react-router-dom";

const AllNotes = ({ notes, setActiveTab }) => {
  return (
    <div>
      
      <div className="px-4 pt-5">
        <h1 className="font-bold text-2xl">All Notes</h1>
        <div className="px-2 pt-4">
          {notes.map((note) => (
            <Link key={note.id} to={`/note/${note.id}`} onClick={() => setActiveTab(null)}>
              <div className="border-b-1 border-[#E0E4EA] mt-3">
                <div className="font-semibold text-[16px]">{note.title}</div>
                <div className="flex gap-2 mt-3">
                  {note.tags.map((tag) => (
                    <div className="bg-[#E0E4EA] text-[#0E121B] text-sm px-1.5 py-0.5 rounded-sm">
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
      </div>
    </div>
  );
};

export default AllNotes;
