import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment, TextField, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SubmitButton from '../../shared/UI/SubmitButton/SubmitButton';
import { IFormRegisterInput, IRegisterFormProps } from './RegisterForm.types';
import { validateRegisterSchema } from './helpers/validateRegisterSchema';

const RegisterForm: FC<IRegisterFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormRegisterInput>({
    defaultValues: defaultValues,
    resolver: yupResolver(validateRegisterSchema),
    mode: 'onBlur',
  });

  const [hiddenPassword, setHiddenPassword] = useState(true);

  const handleVisiblePassword = () => {
    setHiddenPassword((visibility) => !visibility);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography variant="h3" component="h1" align="center">
        Register
      </Typography>

      <TextField
        {...register('email')}
        fullWidth
        label={'Email'}
        margin="normal"
        variant="outlined"
        color="secondary"
        type="email"
        error={!!errors.email?.message}
        helperText={errors.email?.message}
      />

      <TextField
        {...register('password')}
        fullWidth
        label={'Password'}
        margin="normal"
        color="secondary"
        variant="outlined"
        type={hiddenPassword ? 'password' : 'text'}
        helperText={errors.password?.message}
        error={!!errors.password?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{ cursor: 'pointer' }}
              onClick={handleVisiblePassword}
            >
              {hiddenPassword ? <Visibility /> : <VisibilityOff />}
            </InputAdornment>
          ),
        }}
      />

      <SubmitButton>Register</SubmitButton>
    </form>
  );
};

export default RegisterForm;
