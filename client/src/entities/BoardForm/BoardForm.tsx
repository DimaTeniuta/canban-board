import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import SubmitButton from '../../shared/UI/SubmitButton/SubmitButton';
import Spinner from '../../shared/UI/Spinner';
import { validationBoardSchema } from './helpers/validationBoardSchema';
import { IBoardFormProps, IFormBoardInput } from './BoardForm.types';

const BoardForm: FC<IBoardFormProps> = ({ onSubmit, defaultValues, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormBoardInput>({
    defaultValues: defaultValues,
    resolver: yupResolver(validationBoardSchema),
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

      <TextField
        {...register('description')}
        fullWidth
        label={'Description'}
        margin="normal"
        variant="outlined"
        color="secondary"
        type="text"
        error={!!errors.description?.message}
        helperText={errors.description?.message}
      />

      <SubmitButton>Save</SubmitButton>
      {loading && <Spinner />}
    </form>
  );
};

export default BoardForm;
