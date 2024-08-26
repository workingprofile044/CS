import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [comment, setComment] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
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
        setIsUploading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('comment', comment);

        axiosInstance
            .post('api/storage/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => {
                setSuccessMessage('Your file has been uploaded successfully!');
                console.log('File uploaded successfully:', res.data);
                setFile(null);
                setComment('');
            })
            .catch((err) => {
                console.error('File upload error:', err);
                const errorMessage = err.response && err.response.data && err.response.data.detail
                    ? err.response.data.detail
                    : 'Failed to upload your file. Please try again.';
                setSuccessMessage(errorMessage);
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
            {successMessage && <p className="mt-2">{successMessage}</p>}
        </div>
    );
}

export default FileUpload;

