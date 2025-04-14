/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import { toast } from 'sonner';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { uploadImages } from '@/services/ImagesServices'; 

interface ImagePreviewerProps {
  onUploadSuccess?: () => void;
}

export default function ImagePreviewer({ onUploadSuccess }: ImagePreviewerProps) {
  const [images, setImages] = React.useState<File[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImages(prev => [...prev, ...Array.from(files)]);
      toast.success(`${files.length} image(s) selected.`);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    toast.info('Image removed.');
  };

  const handleUpload = async () => {
    if (images.length === 0) return;
    setLoading(true);

    try {
      const result = await uploadImages(images);
      // console.log(result, 'form 40 number line');
      // console.log(result?.statusCode);
     if(result.statusCode === 200){
      toast.success('Images uploaded successfully!');
      setImages([]);
      onUploadSuccess?.();
     }else{
      return toast.error('Images uploaded failed!');
     }
    } catch (error: any) {
      toast.error(`Upload failed: ${error.message}`);
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Button variant="contained" component="label" fullWidth>
        Select Images
        <input
          type="file"
          hidden
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
      </Button>

      {images.length > 0 && (
        <Box>
          <Box
            sx={{
              maxHeight: 300,
              overflowY: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: 2,
              mt: 2,
              pr: 1,
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: '8px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#555',
              },
            }}
          >
            {images.map((file, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  borderRadius: 1,
                  overflow: 'hidden',
                  border: '1px solid #ccc',
                  width: '100%',
                  paddingTop: '100%',
                }}
              >
                <Box
                  component="img"
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  loading="lazy"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveImage(index)}
                  sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>

          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              disabled={images.length === 0 || loading}
              onClick={handleUpload}
            >
              {loading ? 'Uploading...' : 'Upload Images'}
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
