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

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        setIsUploading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('comment', comment);

        axiosInstance
            .post('api/storage/upload/', formData)
            .then((res) => {
                setSuccessMessage('Your file has been uploaded successfully!');
                setErrorMessage('');
                console.log('File uploaded successfully:', res.data);
                setFile(null);  // Reset file input
                setComment('');  // Reset comment input
            })
            .catch((err) => {
                setSuccessMessage('');
                const errorMessage = err.response && err.response.data && err.response.data.detail
                    ? err.response.data.detail
                    : 'Failed to upload your file. Please try again.';
                setErrorMessage(errorMessage);
                console.error('File upload error:', err.response ? err.response : err);
            })
            .finally(() => {
                setIsUploading(false);
            });
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
                    placeholder="Comment"
                    className="form-control mb-2"
                />
                <button
                    type="submit"
                    disabled={isUploading}
                    className="btn btn-primary"
                >
                    {isUploading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
            {successMessage && <p className="mt-2 text-success">{successMessage}</p>}
            {errorMessage && <p className="mt-2 text-danger">{errorMessage}</p>}
        </div>
    );
}

export default FileUpload;
