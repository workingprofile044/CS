import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

function FileList() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        axiosInstance
            .get('/api/storage/files/')
            .then((res) => {
                setFiles(res.data);
            })
            .catch((err) => {
                console.error('Error fetching files:', err);
                alert('Failed to load files.');
            });
    }, []);

    const handleDelete = (fileId) => {
        axiosInstance
            .delete(`/api/storage/delete/${fileId}/`)
            .then(() => {
                setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
            })
            .catch((err) => {
                console.error('Error deleting file:', err);
                alert('Failed to delete file.');
            });
    };

    const handleRename = (fileId, newName) => {
        axiosInstance
            .patch(`/api/storage/rename/${fileId}/`, { new_name: newName })
            .then((res) => {
                setFiles((prevFiles) => prevFiles.map((file) => (file.id === fileId ? res.data : file)));
            })
            .catch((err) => {
                console.error('Error renaming file:', err);
                alert('Failed to rename file.');
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
