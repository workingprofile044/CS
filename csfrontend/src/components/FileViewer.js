import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FileViewer from 'react-file-viewer';
import { CircularProgress, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = makeStyles((theme) => ({
    viewerContainer: {
        position: 'relative',
        width: '100%',
        height: '80vh',
        border: '1px solid #ccc',
        borderRadius: 4,
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
    },
    loadingContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    errorContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    icon: {
        fontSize: 80,
        color: theme.palette.error.main,
        marginBottom: theme.spacing(2),
    },
    retryButton: {
        marginTop: theme.spacing(2),
    },
}));

const supportedFileTypes = [
    'pdf',
    'docx',
    'xlsx',
    'pptx',
    'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
    'mp4',
    'mp3',
    'csv',
    'txt',
    // Add other supported types as needed
];

function CustomFileViewer({ fileUrl, fileType }) {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retry, setRetry] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(null);
        setRetry(false);
    }, [fileUrl, fileType]);

    const handleOnError = (e) => {
        console.error('Error in FileViewer:', e);
        setError('Failed to load the file. Please try again later.');
        setLoading(false);
    };

    const handleOnLoad = () => {
        setLoading(false);
    };

    const handleRetry = () => {
        setRetry(true);
        setLoading(true);
        setError(null);
    };

    if (!supportedFileTypes.includes(fileType.toLowerCase())) {
        return (
            <Alert severity="warning">
                Unsupported file type: {fileType}. Please select a supported file.
            </Alert>
        );
    }

    return (
        <Box className={classes.viewerContainer}>
            {loading && (
                <Box className={classes.loadingContainer}>
                    <CircularProgress />
                </Box>
            )}
            {error && (
                <Box className={classes.errorContainer}>
                    <DescriptionIcon className={classes.icon} />
                    <Typography variant="h6">{error}</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRetry}
                        className={classes.retryButton}
                    >
                        Retry
                    </Button>
                </Box>
            )}
            {!error && (
                <FileViewer
                    fileType={fileType}
                    filePath={fileUrl}
                    onError={handleOnError}
                    onLoad={handleOnLoad}
                />
            )}
        </Box>
    );
}

CustomFileViewer.propTypes = {
    fileUrl: PropTypes.string.isRequired,
    fileType: PropTypes.string.isRequired,
};

export default CustomFileViewer;
