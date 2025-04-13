'use client';

import { CircularProgress, Box, Typography } from '@mui/material';

const Loader = () => {
    return (
        <Box
            sx={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                backgroundColor: 'transparent',
            }}
        >
            <CircularProgress size={80} thickness={4} />
            <Typography variant="h6" mt={2} color="text.secondary">
                Loading, please wait...
            </Typography>
        </Box>
    );
};

export default Loader;
