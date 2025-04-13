"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image';
import { getAllImages } from '@/services/ImagesServices';
import { IImage } from '@/types'; 
import Loader from '../Loaders/Loader';

const ImageGrid = () => {
  const [images, setImages] = React.useState<IImage[]>([]);
  const [loading, setLoading] = React.useState(true);

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

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{}}>
      <ImageList variant="masonry" cols={4} gap={8}>
        {images.map((item) => (
          <ImageListItem key={item._id}>
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
    </Box>
  );
};

export default ImageGrid;
