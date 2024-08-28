import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [comment, setComment] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setIsUploading(true);

    if (!file) {
        setErrorMessage('Выберите файл для загрузки.');
        setIsUploading(false);
        return;
    }

    const formData = new FormData();
    formData.append('file', file);  // Only append the file, no other fields

    try {
        const response = await fetch('http://89.111.175.161:8000/api/storage/upload/', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const resData = await response.json();
        setSuccessMessage('Файл успешно загружен!');
        setFile(null);  // Reset file input
        setComment('');  // Reset comment input
        console.log('File uploaded successfully:', resData);
    } catch (err) {
        setErrorMessage('Не удалось загрузить файл. Попробуйте еще раз.');
        console.error('File upload error:', err);
    } finally {
        setIsUploading(false);
    }
};

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    required
                    className="form-control mb-2"
                />
                <input
                    type="text"
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Комментарий"
                    className="form-control mb-2"
                />
                <button
                    type="submit"
                    disabled={isUploading}
                    className="btn btn-primary"
                >
                    {isUploading ? 'Загрузка...' : 'Загрузить'}
                </button>
            </form>
            {successMessage && <p className="mt-2 text-success">{successMessage}</p>}
            {errorMessage && <p className="mt-2 text-danger">{errorMessage}</p>}
        </div>
    );
}

export default FileUpload;
