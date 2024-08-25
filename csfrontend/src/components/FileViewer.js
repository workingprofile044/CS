// frontend/src/components/FileViewer.js

import React from 'react';
import FileViewer from 'react-file-viewer';

function CustomFileViewer({ fileUrl, fileType }) {
    return (
        <div>
            <FileViewer fileType={fileType} filePath={fileUrl} />
        </div>
    );
}

export default CustomFileViewer;
