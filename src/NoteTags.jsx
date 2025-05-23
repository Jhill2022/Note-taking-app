import React, { useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";

const NoteTags = ({ notes, setSelectedTag = () => {} } ) => {
  const uniqueTags = [...new Set(notes.map((note) => note.tags).flat())].sort();
    const navigate = useNavigate()
  return (
    <div className="px-4 pt-5">
      <h1 className="text-2xl font-bold mb-3">Tags</h1>
      {uniqueTags.map((tag, index) => (
        <div
          key={index}
          className="flex items-center gap-2 mt-4 pb-3 border-b border-[#E0E4EA] last:border-b-0 cursor-pointer hover:text-blue-600"
          onClick={() => {
          setSelectedTag(tag)      // still needed for desktop
      navigate(`/tags/${tag}`);      // ← THIS is the mobile navigation
    }}
        >
          <img src="../src/assets/images/icon-tag.svg" alt="" />
          <span>{tag}</span>
        </div>
      ))}
    </div>
  );
};

export default NoteTags;
