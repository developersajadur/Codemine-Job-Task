"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image';
import { getAllImages } from '@/services/ImagesServices';
import { IImage } from '@/types'; 
import Loader from '../Loaders/Loader';
import { ImagePreviewModal } from './ImagePreviewModal'; // Make sure the path is correct!

const ImageGrid = () => {
  const [images, setImages] = React.useState<IImage[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = React.useState<string | null>(null);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await getAllImages();
        setImages(res?.data || []);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleImageClick = (url: string, title: string,  id: string) => {
    setSelectedImage(url);
    setSelectedTitle(title)
    setSelectedId(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box>
      <ImageList variant="masonry" cols={4} gap={8}>
        {images.map((item) => (
          <ImageListItem key={item._id} onClick={() => handleImageClick(item.url, item.title, item._id)} style={{ cursor: 'pointer' }}>
            <Image
              src={`${item.url}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
              width={400}
              height={500}
            />
          </ImageListItem>
        ))}
      </ImageList>

      <ImagePreviewModal open={open} imageUrl={selectedImage} title={selectedTitle} imageId={selectedId} onClose={handleClose} />
    </Box>
  );
};

export default ImageGrid;
