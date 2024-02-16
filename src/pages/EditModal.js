import {InputLabel, MenuItem, Select} from "@mui/material";
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {updateUser} from "../api/users";

const EditModal = ({ open, onClose, userData, onUpdate, id }) => {
    const [editedData, setEditedData] = useState(userData);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdate = () => {
        updateUser(id, editedData)
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                pt: 2,
                px: 4,
                pb: 3,
            }}>
                <h2>Edit User</h2>
                <TextField
                    fullWidth
                    label="Name"
                    name="displayName"
                    value={editedData?.name}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={editedData?.email}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Role"
                    name="position"
                    value={editedData?.role}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={editedData?.city}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <InputLabel id="select-label">Select Option</InputLabel>
                <Select
                    labelId="select-label"
                    id="select"
                    fullWidth
                    name="status"
                    sx={{ mb: 2 }}
                    value={editedData?.status}
                    onChange={handleChange}
                >
                    <MenuItem value="verified">Verified</MenuItem>
                    <MenuItem value="not_verified">Not Verified</MenuItem>
                </Select>
                <Button variant="contained" onClick={handleUpdate}>Update</Button>
            </Box>
        </Modal>
    );
};

export default EditModal;
