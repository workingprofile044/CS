import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

function FileList() {
    const [files, setFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        axiosInstance.get('api/storage/files/')
            .then((res) => {
                setFiles(res.data);
                setErrorMessage(''); // Clear any previous errors
            })
            .catch((err) => {
                console.error('Error fetching files:', err);
                setErrorMessage('Не удалось загрузить файлы. Попробуйте позже.');
            });
    }, []);

    const handleDelete = (fileId) => {
        if (window.confirm('Вы уверены, что хотите удалить этот файл?')) {
            axiosInstance.delete(`api/storage/delete/${fileId}/`)
                .then(() => {
                    setFiles(files.filter((file) => file.id !== fileId));
                    setErrorMessage(''); // Clear error if any from previous operations
                })
                .catch((err) => {
                    console.error('Error deleting file:', err);
                    setErrorMessage('Не удалось удалить файл. Попробуйте еще раз.');
                });
        }
    };

    const handleRename = (fileId) => {
        const newName = prompt('Новое имя:');
        if (newName) {
            axiosInstance.patch(`api/storage/rename/${fileId}/`, { new_name: newName })
                .then((res) => {
                    setFiles(files.map((file) => (file.id === fileId ? res.data : file)));
                    setErrorMessage(''); // Clear error if any from previous operations
                })
                .catch((err) => {
                    console.error('Error renaming file:', err);
                    setErrorMessage('Не удалось переименовать файл. Попробуйте еще раз.');
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
                            Скачать
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
                            Переименовать
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
                            Удалить
                        </button>
                        <div>
                            <p>Link: <a href={file.download_url} target="_blank" rel="noopener noreferrer">{file.download_url}</a></p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FileList;
