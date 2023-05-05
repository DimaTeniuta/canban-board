import { Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import RegisterForm from '../../entities/RegisterForm/RegisterForm';
import AuthRouteLink from '../../shared/UI/AuthRouteLink/AuthRouteLink';
import { IFormRegisterInput } from '../../entities/RegisterForm/RegisterForm.types';
import { useRegisterMutation } from '../../shared/store/api/endpoints/auth.endpoints';
import { useStoreDispatch } from '../../shared/hooks/storeHooks';
import { setUser } from '../../shared/store/slices/userSlice/userSlice';
import * as Styled from './Register.styles';

const Register = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const dispatch = useStoreDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (inputs: IFormRegisterInput) => {
    register(inputs)
      .unwrap()
      .then((res) => {
        dispatch(setUser(res));
        navigate(`/boards`, { replace: true });
      })
      .catch((err) => {
        enqueueSnackbar(err.data.errorMessage, { variant: 'error' });
      });
  };

  return (
    <Styled.Container maxWidth="xl">
      <Styled.PaperContainer>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item xl={4}>
            <RegisterForm
              onSubmit={handleSubmit}
              defaultValues={{ email: '', password: '', name: '' }}
            />
          </Grid>

          <Grid item xl={4} width={'100%'}>
            <Styled.LinkWrapper>
              <AuthRouteLink path={'/login'}>I have an account</AuthRouteLink>
            </Styled.LinkWrapper>
          </Grid>
        </Grid>
      </Styled.PaperContainer>
    </Styled.Container>
  );
};

export default Register;
