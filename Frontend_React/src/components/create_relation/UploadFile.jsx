import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

function UploadFile() {
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };
    return (
        <div className="container">
            <FileUploader handleChange={handleChange} name="file" types={fileTypes} className="w-100"/>
        </div>
    );
}

export default UploadFile;