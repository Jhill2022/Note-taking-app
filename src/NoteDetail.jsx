import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function NoteDetail({ notes, setNotes }) {
  const { id } = useParams();
  const note = notes.find((note) => note.id === id);

  const [isModalOpen, setIsModalOpen] = useState(false)

  const navigate = useNavigate();

  if (!note) return <div>Note not found</div>;

  function handleDelete(id) {
    const onDelete = notes.filter((note) => note.id !== id);
    setNotes(onDelete);
    navigate("/");
  }

  return (
    <div className="px-4 pt-5">
      <div className="border-b-1 border-[#E0E4EA] lg:hidden">
        <div className="mb-3 flex justify-between ">
          <div
            className="flex text-[#525866] text-lg items-center gap-2"
            onClick={() => navigate("/")}
          >
            <img src="../src/assets/images/icon-arrow-left.svg" alt="" /> Go
            Back
          </div>
          <div className="flex gap-3 items-center">
            <div onClick={() => setIsModalOpen(true)}>
              <img
                className="w-[22px]"
                src="../src/assets/images/icon-delete.svg"
                alt=""
              />
            </div>
            <img
              className="w-[22px]"
              src="../src/assets/images/icon-archive.svg"
              alt=""
            />
            <button className="text-[#525866] items-center">Cancel</button>
            <a className=" text-[#335CFF] items-center ">Save Note</a>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-3xl mt-3">{note.title}</h1>
        <div className="border-b-1 border-[#E0E4EA]">
          <div className="flex mt-3 ">
            <div className="w-[155px]">
              <p className="flex gap-2 text-[#2B303B]">
                <img src="../src/assets/images/icon-tag.svg" alt="" />
                Tags
              </p>
            </div>
            <p className="text-[#2B303B]">
              {note.tags.map((tag, index) => (
                <span key={index}>
                  {index > 0 ? ", " : ""}
                  {tag}
                </span>
              ))}
            </p>
          </div>
          <div className="flex mb-3">
            <div className="w-[155px]">
              <p className="flex gap-2 text-[#2B303B]">
                <img src="../src/assets/images/icon-clock.svg" alt="" />
                Last edited
              </p>
            </div>
            <p className="text-[#2B303B]">
              {new Date(note.lastEdited).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
      <p className="whitespace-pre-line text-[#2B303B] mt-3">{note.content}</p>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <div className="border-b-2 border-[#E0E4EA] flex items-start">
              <div className="bg-[#F3F5F8] px-2 py-2 rounded-lg items-center justify-center mr-4"><img className="w-16" src="../src/assets/images/icon-delete.svg" alt="" /></div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Delete Note</h2>
                <p className="mb-6 text-gray-600">Are you sure you want to permanently delete this note? This action cannot be undone.</p>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(note.id)} // this function should delete the note
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteDetail;
