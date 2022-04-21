import React, { useEffect } from "react";

// React Router DOM Imports
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "../components/editor/Editor";
import { useSessionStorage } from "../hooks/useSessionStorage";

export const KatasDetailPage = () => {
  let loggedIn = useSessionStorage("sessionJWTToken");
  let navigate = useNavigate();
  // Find id from params
  let { id } = useParams();

  useEffect(() => {
    if (!loggedIn) {
      return navigate("/login");
    }
  }, [loggedIn]);

  return (
    <div>
      <h1>Kata Detail Page: {id}</h1>
      <Editor></Editor>
    </div>
  );
};