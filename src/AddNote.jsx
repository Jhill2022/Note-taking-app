import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from "uuid";

const AddNote = ({ setNotes}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const handleTagChange = (e) => {
    const input = e.target.value;
    // If last char is a comma, finalize the tag
    if (input.endsWith(",")) {
      const newTag = input.slice(0, -1).trim(); // remove comma and trim
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput(""); // reset input
    } else {
      setTagInput(input);
    }
  };

  const navigate = useNavigate()

  const handleAdd = () => {
    const finalTags = tagInput.trim()
    ? [...tags, tagInput.trim()]
    : tags;
    const newNote = {
      id: uuidv4(),
      title,
      content,
      tags: finalTags,
      lastEdited: new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
    };
    setTitle("");
  setContent("");
  setTags([]);
  setTagInput("");
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    navigate("/"); // Go back to home after adding
  };


  function handleDelete(id) {
      const onDelete = notes.filter(note => note.id !== id)
      setNotes(onDelete)
  }
  return (
    <div className="px-4 pt-5">
      <div className="border-b-1 border-[#E0E4EA]">
        <div className="mb-3 flex justify-between ">
          <div onClick={() => navigate("/")} className="flex text-[#525866] text-lg items-center gap-2">
            <img src="../src/assets/images/icon-arrow-left.svg" alt="" /> Go
            Back
          </div>
          <div className="flex gap-3 items-center">
            
            <button className="text-[#525866] items-center">Cancel</button>
            <a onClick={handleAdd} className=" text-[#335CFF] items-center ">Save Note</a>
          </div>
        </div>
      </div>
      <div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className='text-2xl placeholder-[#0E121B]' type="text" placeholder='Enter a title...'/>
        <div className="border-b-1 border-[#E0E4EA]">
            <div className="flex mt-3 ">
              <div className="w-[235px]">
                <p className="flex gap-2 text-[#2B303B]">
                  <img src="../src/assets/images/icon-tag.svg" alt="" />
                  Tags
                </p>
              </div>
              <textarea value={tagInput} onChange={handleTagChange} className='text-sm w-full overflow-hidden' type="text" placeholder='Add tags separated by commas (e.g. Work, Planning)'/>
            </div>
            <div className="flex mb-3">
              <div className="w-[155px]">
                <p className="flex gap-2 text-[#2B303B]">
                  <img src="../src/assets/images/icon-clock.svg" alt="" />
                  Last edited
                </p>
              </div>
              <input type="text" placeholder='Not yet saved'/>
            </div>
        </div>
      </div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)}className='w-full  placeholder-[#2B303B]' placeholder='Start typing your note here…'></textarea>
    </div>
  )
}

export default AddNote