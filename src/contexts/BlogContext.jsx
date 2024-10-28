import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

export const BlogContext = createContext();

export const BlogContextProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [story, setStory] = useState("");
  const [imageText, setImageText] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [coverUrl, setCoverUrl] = useState(null);
  const [viewers, setViewers] = useState("");
  return (
    <BlogContext.Provider
      value={{
        title,
        setTitle,
        subTitle,
        setSubTitle,
        story,
        setStory,
        imageText,
        setImageText,
        coverFile,
        setCoverFile,
        coverUrl,
        setCoverUrl,
        viewers,
        setViewers,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
