'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ImagePreviewer from './ImagePreviewer';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
};

interface ImageUploadModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ImageUploadModal({ open, setOpen }: ImageUploadModalProps) {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose} variant="outlined" size="small">
            Close
          </Button>
        </Box>

        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mt: 1 }}>
          Upload Images
        </Typography>

        <Box sx={{ mt: 2 }}>
          <ImagePreviewer onUploadSuccess={handleClose} />
        </Box>
      </Box>
    </Modal>
  );
}
