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

        if (!file) {
            setErrorMessage('Please select a file to upload.');
            setIsUploading(false);
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('comment', comment);

        axiosInstance
            .post('api/storage/upload/', formData)
            .then((res) => {
                setSuccessMessage('Your file has been uploaded successfully!');
                setErrorMessage('');
                console.log('File uploaded successfully:', res.data);
                setFile(null);
                setComment('');
            })
            .catch((err) => {
                setSuccessMessage('');
                const errorResponse = err.response ? err.response.data : null;
                const errorMessage = errorResponse && errorResponse.detail
                    ? errorResponse.detail
                    : 'Failed to upload your file. Please try again.';

                console.error('File upload error:', {
                    message: err.message,
                    response: errorResponse,
                });

                setErrorMessage(errorMessage);
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
