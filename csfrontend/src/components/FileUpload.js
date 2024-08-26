import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [comment, setComment] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('comment', comment);

        axiosInstance
            .post('/api/storage/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                console.log('File uploaded successfully:', res.data);
            })
            .catch((err) => {
                console.error('File upload error:', err);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} required />
                <input
                    type="text"
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Comment"
                />
                <button type="submit">Upload</button>
            </form>
            {uploadSuccess && <p>File uploaded successfully!</p>}
        </div>
    );
}

export default FileUpload;
