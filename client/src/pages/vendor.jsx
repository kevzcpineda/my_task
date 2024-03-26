import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import Modal from '../components/vendor/modal';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import EditModal from '../components/vendor/editModal';
const vendor = () => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const { mutate } = useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://127.0.0.1:3000/vendor/${id}`);
    },
    onError: (error, variables, context) => {
      console.log(`rolling back optimistic update with id ${context.id}`);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['vendor'] }),
  });
  const { isPending, isError, data, error, isSuccess } = useQuery({
    queryKey: ['vendor'],
    queryFn: () => axios.get('http://127.0.0.1:3000/vendor'),
  });
  console.log('data', data);
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

  if (isSuccess) {
    return (
      <>
        <Modal open={open} handleClose={handleClose} />
        {openEdit && (
          <EditModal
            open={openEdit}
            handleClose={handleCloseEdit}
            editData={editData}
          />
        )}
        <Button variant='contained' onClick={() => handleClickOpen()}>
          ADD
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell>Vendor Code</TableCell>
                <TableCell align='right'>Vendor Name</TableCell>
                <TableCell align='right'>Vendor Class Description</TableCell>
                <TableCell align='right'>Vendor Type Description</TableCell>
                <TableCell align='right'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align='right'>{row.vendor_code}</TableCell>
                  <TableCell align='right'>{row.vendor_name}</TableCell>
                  <TableCell align='right'>{row.vendor_class_code}</TableCell>
                  <TableCell align='right'>{row.vendor_type_code}</TableCell>
                  <TableCell align='right'>
                    {' '}
                    <Stack spacing={2} direction='row'>
                      {' '}
                      <Button
                        variant='contained'
                        onClick={() => handleEdit(row.id)}>
                        Update
                      </Button>
                      <Button
                        variant='contained'
                        onClick={() => mutate(row.id)}>
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
  }
};

export default vendor;
