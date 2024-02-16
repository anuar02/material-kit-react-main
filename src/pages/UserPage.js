import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import React, {useEffect, useState} from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination, Modal, Box, TextField, DialogActions, Select, InputLabel, Chip,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import {createUser, handleUpdate, removeUser} from "../api/users";
import EditUserForm from "../components/create/CreateUser";
import EditModal from "./EditModal";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'ФИО', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'role', label: 'Роль', alignRight: false },
  { id: 'city', label: 'Город', alignRight: false },
  { id: 'status', label: 'Статус', alignRight: false },
];



// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}



function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    console.log(array)
    return filter(array, (_user) => _user.data.displayName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [users, setUsers] = useState([]);

  const [deleteId, setDeleteId] = useState(null);

  const [editUser, setEditUser] = useState(null)

  const [editUserForm, setEditUserForm] = useState(false)

  const [edit, setEdit] = useState(false)


  const handleEdit = (user) => {
    setEditUserForm(true)
    setEditUser(user);
  };

  const handleEditClose = () => {
    setEditUserForm(false);
  };

  const handleCloseEditModal = () => {
    setEdit(false)
    document.location.reload();
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target)
    setEditUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveEdit = (updatedUser) => {
    const id = editUser;
    createUser(editUser)
        .then(() => {
          const updatedUsers = users.map((user) =>
              user.id === id ? { ...user, ...updatedUser } : user
          );
          setUsers(updatedUsers);
          setEditUser(null);
          setEditUserForm(false); // Close the edit form after saving changes
        })
        .catch((error) => {
          console.error('Error editing user:', error);
        });
  };

  const handleOpenMenu = (event, id, row) => {
    setDeleteId(id)
    setEditUser(row)
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEditButton = () => {
    setEdit(true)
  }

  const handleDelete = () => {
    const id = deleteId
    removeUser(id)
        .then(() => {
          setUsers(users.filter(user => user.id !== id));
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const inputStyle = {
    marginBottom: 2,
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/users/')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          return response.json();
        })
        .then(data => {
          setUsers(data);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
  }, []);

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Сотрудники | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Сотрудники
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleEdit()}>
            Новый сотрудник
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, data } = row;
                    const { displayName, email, position, id_, city, status } = data;
                    const selectedUser = selected.indexOf(id) !== -1

                    return (
                        <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                          <TableCell padding="checkbox">
                            <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, id)} /> {/* Change name to id */}
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {displayName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{position}</TableCell>
                          <TableCell align="left">{city}</TableCell>
                          <TableCell align="left">
                            {status === 'not_verified' ? (
                                <Chip
                                    color="error"
                                    disabled={false}
                                    size="medium"
                                    variant="elevated"
                                    label={status}
                                />
                            ) : (
                                <Chip
                                    color="info"
                                    disabled={false}
                                    size="medium"
                                    variant="elevated"
                                    label={status}
                                />
                            )}
                          </TableCell>
                            <TableCell align="right">
                            <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, id, row)}>
                              <Iconify icon={'eva:more-vertical-fill'} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <Modal
          open={editUserForm}
          onClose={handleEditClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2>Create User</h2>

          <TextField
              fullWidth
              sx={inputStyle}
              label="Name"
              name="displayName"
              value={editUser?.name}
              onChange={handleChange}
          />
          <TextField
              fullWidth
              label="Email"
              sx={inputStyle}
              name="email"
              value={editUser?.email}
              onChange={handleChange}
          />
          <TextField
              fullWidth
              sx={inputStyle}
              label="Role"
              name="position"
              value={editUser?.role}
              onChange={handleChange}
          />
          <TextField
              fullWidth
              sx={inputStyle}
              label="City"
              name="city"
              value={editUser?.city}
              onChange={handleChange}
          />
          <InputLabel id="select-label">Select Option</InputLabel>
          <Select
              labelId="select-label"
              id="select"
              fullWidth
              name="status"
              sx={inputStyle}
              value={editUser?.status}
              onChange={handleChange}
          >
            <MenuItem value="verified">Verified</MenuItem>
            <MenuItem value="not_verified">Not Verified</MenuItem>
          </Select>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save</Button>
          </DialogActions>
        </Box>
      </Modal>
      <EditModal open={edit} userData={editUser} onClose={handleCloseEditModal} id={deleteId}/>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem sx={{ color: 'error.main' }} onClick={() => handleDelete()}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
        <MenuItem sx={{ color: 'edit.main' }} onClick={() => handleEditButton()}>
          <Iconify icon={'eva:edit-2-outline'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
      </Popover>
    </>
  );
}
