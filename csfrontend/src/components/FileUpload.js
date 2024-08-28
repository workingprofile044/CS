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
    formData.append('file', file);  // Make sure the file is correctly appended
    formData.append('comment', comment);

    try {
        const res = await axiosInstance.post('/api/storage/upload/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Ensure multipart/form-data is used for file uploads
            },
        });
        setSuccessMessage('Файл успешно загружен!');
        setFile(null);  // Reset file input
        setComment('');  // Reset comment input
        console.log('File uploaded successfully:', res.data);
    } catch (err) {
        const errorMessage = err.response && err.response.data && err.response.data.detail
            ? err.response.data.detail
            : 'Не удалось загрузить файл. Попробуйте еще раз.';
        setErrorMessage(errorMessage);
        console.error('File upload error:', err.response ? err.response : err);
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
