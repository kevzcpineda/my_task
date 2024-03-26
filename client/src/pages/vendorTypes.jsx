import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import MyModal from '../components/vendor-types/modal';
import EditModal from '../components/vendor-types/editModal';
const VendorTypes = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const { mutate } = useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://127.0.0.1:3000/vendorType/${id}`);
    },
    onError: (error, variables, context) => {
      console.log(`rolling back optimistic update with id ${context.id}`);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ['vendorTypes'] }),
  });
  const { isPending, isError, data, error, isSuccess } = useQuery({
    queryKey: ['vendorTypes'],
    queryFn: () => axios.get('http://127.0.0.1:3000/vendorType'),
  });
  console.log('data', data);

  const handleDelete = (id) => {
    mutate(id);
  };
  const handleEdit = (id) => {
    const value = data?.data?.filter((item) => item.id === id);
    setEditData(value);
    setOpenEdit(true);
  };

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <MyModal open={open} handleClose={handleClose} />
      {openEdit && (
        <EditModal
          open={openEdit}
          handleClose={handleCloseEdit}
          editData={editData}
        />
      )}

      <Button onClick={() => handleClickOpen()}>Open modal</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>vendor_type_code</TableCell>
              <TableCell align='right'>vendor_type_description </TableCell>

              <TableCell align='right'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align='right'>{row.vendor_type_code}</TableCell>
                <TableCell align='right'>
                  {row.vendor_type_description}
                </TableCell>

                <TableCell align='right'>
                  <Stack spacing={2} direction='row'>
                    <Button
                      variant='contained'
                      onClick={() => handleEdit(row.id)}>
                      Update
                    </Button>
                    <Button
                      variant='contained'
                      onClick={() => handleDelete(row.id)}>
                      Delete
                    </Button>{' '}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default VendorTypes;
