import { Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../entities/RegisterForm/RegisterForm';
import AuthRouteLink from '../../shared/UI/AuthRouteLink/AuthRouteLink';
import { IFormRegisterInput } from '../../entities/RegisterForm/RegisterForm.types';
import { useRegisterMutation } from '../../shared/store/api/endpoints/auth.endpoints';
import { useStoreDispatch } from '../../shared/hooks/store.hooks';
import { setUser } from '../../shared/store/slices/userSlice';
import * as Styled from './Register.styles';

const Register = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const dispatch = useStoreDispatch();

  const handleSubmit = (inputs: IFormRegisterInput) => {
    console.log('submit', inputs);
    register(inputs)
      .unwrap()
      .then((res) => {
        dispatch(setUser(res));
        navigate(`/home`, { replace: true });
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
