"use client";

import { Modal, Box, IconButton, Typography, Button } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from 'sweetalert2'
import { deleteImage } from "@/services/ImagesServices";

interface ImagePreviewModalProps {
  open: boolean;
  imageUrl: string | null;
  title?: string | null;
  imageId?: string | null;
  onClose: () => void;
}

export const ImagePreviewModal = ({ open, imageUrl, title, imageId, onClose }: ImagePreviewModalProps) => {

  const handleDelete = async (id: string) => {
    if (!id) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: 'custom-swal-zindex'
      }
    });

    if (result.isConfirmed) {
      try {
       const res = await deleteImage(id)
    //    console.log(res);

        if (res.statusCode === 200) {
          await Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          onClose();
        } else {
          Swal.fire({
            title: "Error!",
            text: `${res.message}`,
            icon: "error"
          });
        }
      } catch (error) {
        console.error("Error deleting image:", error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred while deleting the image.",
          icon: "error"
        });
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          bgcolor: "rgba(0, 0, 0, 0.95)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            color: "white",
            backgroundColor: "rgba(0,0,0,0.4)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
          }}
        >
          <CloseIcon />
        </IconButton>

        {imageId && (
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(imageId)}
            sx={{
              position: "absolute",
              bottom: 20,
              right: 20,
              zIndex: 10
            }}
          >
            Delete
          </Button>
        )}

        <Box sx={{ textAlign: "center" }}>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title || "Preview"}
              loading="lazy"
              width={1200}
              height={800}
              style={{
                maxWidth: "90vw",
                maxHeight: "80vh",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          )}

          {title && (
            <Typography variant="subtitle1" sx={{ color: "#fff", mt: 2 }}>
              {title}
            </Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
};
