import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

function FileList() {
    const [files, setFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        axiosInstance.get('/storage/files/')
            .then((res) => {
                setFiles(res.data);
                setErrorMessage(''); // Clear any previous errors
            })
            .catch((err) => {
                console.error('Error fetching files:', err);
                setErrorMessage('Failed to fetch files. Please try again later.');
            });
    }, []);

    const handleDelete = (fileId) => {
        if (window.confirm('Are you sure you want to delete this file?')) {
            axiosInstance.delete(`/storage/delete/${fileId}/`)
                .then(() => {
                    setFiles(files.filter((file) => file.id !== fileId));
                    setErrorMessage(''); // Clear error if any from previous operations
                })
                .catch((err) => {
                    console.error('Error deleting file:', err);
                    setErrorMessage('Failed to delete the file. Please try again.');
                });
        }
    };

    const handleRename = (fileId) => {
        const newName = prompt('New name:');
        if (newName) {
            axiosInstance.patch(`/storage/rename/${fileId}/`, { new_name: newName })
                .then((res) => {
                    setFiles(files.map((file) => (file.id === fileId ? res.data : file)));
                    setErrorMessage(''); // Clear error if any from previous operations
                })
                .catch((err) => {
                    console.error('Error renaming file:', err);
                    setErrorMessage('Failed to rename the file. Please try again.');
                });
        }
    };

    return (
        <div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {files.map((file) => (
                    <li key={file.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '10px' }}>{file.original_name}</span>
                        <a
                            href={file.download_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                textDecoration: 'none',
                                color: 'white',
                                backgroundColor: '#007bff',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                marginRight: '10px',
                            }}
                        >
                            Download
                        </a>
                        <button
                            onClick={() => handleRename(file.id)}
                            style={{
                                backgroundColor: '#28a745',
                                color: 'white',
                                padding: '5px 10px',
                                border: 'none',
                                borderRadius: '5px',
                                marginRight: '10px',
                                cursor: 'pointer',
                            }}
                        >
                            Rename
                        </button>
                        <button
                            onClick={() => handleDelete(file.id)}
                            style={{
                                backgroundColor: '#dc3545',
                                color: 'white',
                                padding: '5px 10px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FileList;
