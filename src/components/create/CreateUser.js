import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export default function EditUserForm({ user, onEdit, onClose }) {
    const [editedUser, setEditedUser] = useState(user);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSave = () => {
        onEdit(editedUser);
    };

    // Check if user object exists and if the name property is defined
    if (!user || !user.name) {
        return null; // or display a message indicating that the user data is incomplete
    }

    return (
        <Dialog onClose={onClose}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={editedUser.name}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Role"
                    name="role"
                    value={editedUser.role}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={editedUser.city}
                    onChange={handleChange}
                />
                {/* Add other fields as needed */}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}
