import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, StyledEngineProvider, TextField, Typography } from '@mui/material';
import SubmitButton from '../../shared/UI/SubmitButton/SubmitButton';
import Spinner from '../../shared/UI/Spinner/Spinner';
import { IUserFormInput, IUserFormProps } from './UserForm.types';
import { validationUserSchema } from './helpers/validationUserSchema';
import * as Styled from './UserForm.styles';

const UserForm: FC<IUserFormProps> = ({ onSubmit, onDelete, defaultValues, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserFormInput>({
    defaultValues: defaultValues,
    resolver: yupResolver(validationUserSchema),
    mode: 'onBlur',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography variant="h3" component="h1" align="center">
        User
      </Typography>

      <TextField
        {...register('name')}
        fullWidth
        label={'Name'}
        margin="normal"
        variant="outlined"
        color="secondary"
        type="name"
        error={!!errors.name?.message}
        helperText={errors.name?.message}
      />

      <TextField
        {...register('email')}
        fullWidth
        label={'Email'}
        margin="normal"
        variant="outlined"
        color="secondary"
        type="email"
        disabled={true}
        error={!!errors.email?.message}
        helperText={errors.email?.message}
      />

      <Styled.ButtonWrap>
        <SubmitButton>Update</SubmitButton>
        <Button fullWidth variant="contained" color="error" onClick={onDelete}>
          Delete
        </Button>
      </Styled.ButtonWrap>

      {loading && <Spinner />}
    </form>
  );
};

export default UserForm;
