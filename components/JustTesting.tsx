"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";

const JustTesting = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setSelectedFiles(files);
  };

  const validateForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedFiles && selectedFiles.length > 5) {
      alert("You can only upload up to 5 files.");
      return;
    }

    // Continue with form submission logic or call an API here
  };

  return (
    <form
      action="/api/upload"
      method="post"
      encType="multipart/form-data"
      onSubmit={validateForm}
    >
      <label htmlFor="files">Select files (up to 5):</label>
      <input
        type="file"
        id="files"
        name="files"
        multiple
        onChange={handleFileChange}
      />
      <br />
      <br />
      <input type="submit" value="Upload" />
    </form>
  );
};

export default JustTesting;
