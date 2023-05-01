import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import SubmitButton from '../../shared/UI/SubmitButton';
import Spinner from '../../shared/UI/Spinner/Spinner';
import { validationTaskSchema } from './helpers/validationTaskScheme';
import { ITaskFormInputs, ITaskFormProps } from './TaskForm.types';

const TaskForm: FC<ITaskFormProps> = ({ onSubmit, defaultValues, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITaskFormInputs>({
    defaultValues: defaultValues,
    resolver: yupResolver(validationTaskSchema),
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

export default TaskForm;
