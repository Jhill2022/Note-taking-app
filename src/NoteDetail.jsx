import React from "react";
import { useParams, Link } from "react-router-dom";


function NoteDetail({ notes }) {
  const { id } = useParams();
  const note = notes.find((note) => note.id === id);

  if (!note) return <div>Note not found</div>;

  return (
    <div className="px-4 pt-5">
      <div className="border-b-2 border-[#E0E4EA]">
        <div className="mb-3 flex justify-between ">
          <Link className="flex text-[#525866] text-lg items-center gap-2" to={"/"}>
            <img src="../src/assets/images/icon-arrow-left.svg" alt="" /> Go
            Back
          </Link>
          <div className="flex gap-3 items-center">
            <img className="w-[22px]" src="../src/assets/images/icon-delete.svg" alt="" />
            <img className="w-[22px]" src="../src/assets/images/icon-archive.svg" alt="" />
            <button className="text-[#525866] items-center">Cancel</button>
            <a className=" text-[#335CFF] items-center ">Save Note</a>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-3xl mt-3">{note.title}</h1>
        <div className="border-b-2 border-[#E0E4EA]">
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
    </div>
  );
}

export default NoteDetail;
