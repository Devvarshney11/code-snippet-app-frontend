import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SubmitForm from "./Pages/SubmitForm";
import CodeSnippetTable from "./Pages/CodeSnippetTable";
import "./App.css";

const App = () => {
  const [codeSnippets, setCodeSnippets] = useState([]);

  const handleSubmit = (snippet) => {
    setCodeSnippets([
      ...codeSnippets,
      { ...snippet, timestamp: new Date().toLocaleString() },
    ]);
    // Call API to submit snippet to backend here
  };
  const approuter = createBrowserRouter([
    {
      path: "/",
      element: <SubmitForm onSubmit={handleSubmit} />,
    },
    {
      path: "/table",
      element: <CodeSnippetTable codeSnippets={codeSnippets} />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={approuter} />
    </div>
  );
};

export default App;
