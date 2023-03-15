import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
} from '@mui/material';

import { useLoginUserMutation } from 'redux/api/contacts/users/usersApi';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from 'redux/api/contacts/users/authSlice';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function SignInPages() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isError }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const user = { email, password };
    const response = await login(user);

    if (response.data) {
      dispatch(setCredentials(response.data));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            type="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleChange}
            inputProps={{
              inputMode: 'email',
              pattern:
                '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-]+)(\\.[a-zA-Z]{2,5}){1,2}$',
              title: 'Incorrect mail address',
            }}
            error={isError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChange}
            error={isError}
            helperText={isError && 'Incorrect email or password'}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Link href="/goit-react-hw-08-phonebook/register" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
