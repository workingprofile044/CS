// frontend/src/components/FileList.js

import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

function FileList() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        axiosInstance.get('storage/files/').then((res) => {
            setFiles(res.data);
        });
    }, []);

    const handleDelete = (fileId) => {
        axiosInstance.delete(`storage/delete/${fileId}/`).then(() => {
            setFiles(files.filter((file) => file.id !== fileId));
        });
    };

    const handleRename = (fileId, newName) => {
        axiosInstance.patch(`storage/rename/${fileId}/`, { new_name: newName }).then((res) => {
            setFiles(files.map((file) => (file.id === fileId ? res.data : file)));
        });
    };

    return (
        <ul>
            {files.map((file) => (
                <li key={file.id}>
                    {file.original_name}
                    <button onClick={() => handleDelete(file.id)}>Delete</button>
                    <button onClick={() => handleRename(file.id, prompt('New name:'))}>Rename</button>
                </li>
            ))}
        </ul>
    );
}

export default FileList;
