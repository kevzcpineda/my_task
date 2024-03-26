import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import { useQueryClient, useMutation } from '@tanstack/react-query';
const Modal = ({ open, handleClose }) => {
  const queryClient = useQueryClient();
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const { mutate } = useMutation({
    mutationFn: () => {
      return axios.post('http://127.0.0.1:3000/vendorType', values);
    },
    onError: (error, variables, context) => {
      console.log(`rolling back optimistic update with id ${context.id}`);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ['vendorTypes'] }),
    onSuccess: () => {
      handleClose();
    },
  });
  return (
    <Dialog fullWidth={true} maxWidth='lg' open={open} onClose={handleClose}>
      <DialogTitle>Optional sizes</DialogTitle>
      <DialogContent>
        <Box
          component='form'
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete='off'>
          <FormControl>
            <InputLabel htmlFor='component-outlined'>
              vendor type code
            </InputLabel>
            <OutlinedInput
              id='component-outlined'
              name='vendor_type_code'
              label='vendor type code'
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='component-outlined'>
              vendor type description{' '}
            </InputLabel>
            <OutlinedInput
              id='component-outlined'
              name='vendor_type_description'
              label='vendor type description	'
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => mutate()}>Submit</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
