import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
// @mui
import {Box, Card, Link, Typography, Stack, DialogTitle, IconButton, DialogContent, DialogActions} from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import React, {useState} from "react";
import { fCurrency } from '../../../utils/formatNumber';
// components

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};


export default function ShopProductCard({ product }) {
    const [isHovered, setIsHovered] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onDelete = () => {
        fetch(`
                    http://localhost:3000/api/products/${product.title}/${product.id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to remove item');
                }
                return response.json();
            })
            .then(data => {
                console.log('error')
            })
            .catch(error => {
                console.log(error)
            });
    };

    const { comments, price, imageUrl, name, id, likes } = product;

    return (
        <Card
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Box sx={{ pt: '100%', position: 'relative' }}>
                {isHovered && (
                    <button
                        onClick={handleClickOpen()}
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            zIndex: 9999,
                            backgroundColor: 'red',
                            padding: '8px 12px',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Remove
                    </button>
                )}
                <StyledProductImg alt={name} src={imageUrl} />
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link color="inherit" underline="hover">
                    <Typography variant="subtitle2" noWrap>
                        {name}
                    </Typography>
                </Link>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1">
                        <Typography
                            component="span"
                            variant="body1"
                            sx={{
                                color: 'text.disabled',
                                textDecoration: 'line-through',
                            }}
                        >
                            {price}
                        </Typography>
                        &nbsp;
                        {fCurrency(price + 5)}
                    </Typography>
                </Stack>
            </Stack>
            <Dialog open={open} maxWidth="sm" fullWidth>
                <DialogTitle>Удаление продукта</DialogTitle>
                <DialogContent>
                    <Typography>Вы уверены что хотите удалить данный продукт?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose} variant="contained" >
                        Отмена
                    </Button>
                    <Button color="error" variant="contained"
                            onClick={onDelete}
                    >
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}
