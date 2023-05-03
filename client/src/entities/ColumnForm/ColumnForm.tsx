import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import SubmitButton from '../../shared/UI/SubmitButton/SubmitButton';
import Spinner from '../../shared/UI/Spinner';
import { IColumnFormProps, IFormColumnInput } from './ColumnForm.types';
import { validationColumnSchema } from './helpers/validationColumnSchema';

const ColumnForm: FC<IColumnFormProps> = ({ onSubmit, defaultValues, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormColumnInput>({
    defaultValues: defaultValues,
    resolver: yupResolver(validationColumnSchema),
    mode: 'onBlur',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        {...register('title')}
        fullWidth
        label={'Title'}
        margin="normal"
        variant="outlined"
        color="secondary"
        type="text"
        error={!!errors.title?.message}
        helperText={errors.title?.message}
      />

      <SubmitButton>Save</SubmitButton>
      {loading && <Spinner />}
    </form>
  );
};

export default ColumnForm;
