import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FilledInput from '@mui/material/FilledInput';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
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
  console.log('value', values);
  const { isPending, isError, data, error, isSuccess } = useQuery({
    queryKey: ['vendorTypes'],
    queryFn: () => axios.get('http://127.0.0.1:3000/vendorType'),
  });
  const { data: vendorClassData, isSuccess: vendorClassIsSuccess } = useQuery({
    queryKey: ['vendorClass'],
    queryFn: () => axios.get('http://127.0.0.1:3000/vendorClass'),
  });
  const { mutate } = useMutation({
    mutationFn: () => {
      return axios.post('http://127.0.0.1:3000/vendor', values);
    },
    onError: (error, variables, context) => {
      console.log(`rolling back optimistic update with id ${context.id}`);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['vendor'] }),
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
          {vendorClassIsSuccess && (
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>
                vendor type code
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={values.vendor_class_code}
                name='vendor_class_code'
                label='vendor_class_code'
                onChange={handleChange}>
                {vendorClassData?.data?.map((item, index) => {
                  return (
                    <MenuItem value={item.vendor_class_code} key={index}>
                      {item.vendor_class_code}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          )}
          {isSuccess && (
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>
                vendor type code
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={values.vendor_type_code}
                name='vendor_type_code'
                label='vendor_type_code'
                onChange={handleChange}>
                {data?.data?.map((item, index) => {
                  return (
                    <MenuItem value={item.vendor_type_code} key={index}>
                      {item.vendor_type_code}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          )}

          <FormControl>
            <InputLabel htmlFor='component-outlined'>vendors code</InputLabel>
            <OutlinedInput
              id='component-outlined'
              name='vendor_code'
              label='vendors-code'
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='component-outlined'>vendors name</InputLabel>
            <OutlinedInput
              id='component-outlined'
              name='vendor_name'
              label='vendor-name'
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='component-outlined'>Email Address</InputLabel>
            <OutlinedInput
              id='component-outlined'
              name='email_address'
              label='email-addres	'
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='component-outlined'>address 1</InputLabel>
            <OutlinedInput
              id='component-outlined'
              name='address_1'
              label='address-1'
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='component-outlined'>addres 2</InputLabel>
            <OutlinedInput
              id='component-outlined'
              name='address_2'
              label='address-2'
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='component-outlined'>zip-code</InputLabel>
            <OutlinedInput
              id='component-outlined'
              name='zip_code'
              label='vendor type description	'
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='component-outlined'>region</InputLabel>
            <OutlinedInput
              id='component-outlined'
              name='region'
              label='vendor type description	'
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='component-outlined'>area</InputLabel>
            <OutlinedInput
              id='component-outlined'
              name='area'
              label='vendor type description	'
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='component-outlined'>payments terms</InputLabel>
            <OutlinedInput
              id='component-outlined'
              name='payment_terms'
              label='vendor type description	'
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='component-outlined'>tax class</InputLabel>
            <OutlinedInput
              id='component-outlined'
              name='tax_class'
              label='vendor type description	'
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='component-outlined'>tin</InputLabel>
            <OutlinedInput
              id='component-outlined'
              name='tin_number'
              label='vendor type description	'
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='component-outlined'>EWT code</InputLabel>
            <OutlinedInput
              id='component-outlined'
              name='ewt_code'
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
