import { Helmet } from 'react-helmet-async';
import React, { useState } from 'react';
// @mui
import {Box, Button, Container, DialogActions, Modal, Stack, TextField, Typography} from '@mui/material';
// components
import { ProductSort, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import CategoriesComponent from "../sections/@dashboard/products/ProductList";
import Iconify from "../components/iconify";
import {createProductSend} from "../api/users";

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [createProductForm, setCreateProductForm] = useState(false)
  const [createProduct, setCreateProduct] = useState({})


  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };


  const inputStyle = {
    marginBottom: 2,
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleCreateClose = () => {
    setCreateProductForm(false);
  };

  const handleSaveEdit = () => {
    createProductSend(createProduct)
        .then(() => {
          setCreateProduct(null);
          setCreateProductForm(false); // Close the edit form after saving changes
        })
        .catch((error) => {
          console.error('Error editing user:', error);
        });
    document.window.reload()
  };

  const handleEditClose = () => {
    setCreateProductForm(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreateProduct((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    setCreateProductForm(true)
    console.log('gg')
  }

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Продукты
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleAddProduct()}>
            Добавить продукт
          </Button>
        </Stack>
        <Modal
            open={createProductForm}
            onClose={handleCreateClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <h2>Добавить продукт</h2>
            <TextField
                fullWidth
                sx={inputStyle}
                label="Категория"
                name="title"
                value={createProduct?.title}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                sx={inputStyle}
                label="Название"
                name="name"
                value={createProduct?.name}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                label="Ссылка на изображение"
                sx={inputStyle}
                name="imageUrl"
                value={createProduct?.imageUrl}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                sx={inputStyle}
                label="Цена"
                name="price"
                value={createProduct?.city}
                onChange={handleChange}
            />
            <DialogActions>
              <Button onClick={handleEditClose}>Cancel</Button>
              <Button onClick={handleSaveEdit}>Save</Button>
            </DialogActions>
          </Box>
        </Modal>
        <CategoriesComponent/>
      </Container>
    </>
  );
}
