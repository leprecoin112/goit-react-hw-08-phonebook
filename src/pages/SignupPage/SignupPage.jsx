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

import { useSignupUserMutation } from 'redux/api/contacts/users/usersApi';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from 'redux/api/contacts/users/authSlice';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function SignupPages() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [signup] = useSignupUserMutation();
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
      case 'name':
        setUserName(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const user = { email, password, name: userName };
    const response = await signup(user);

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
            label="User name"
            name="name"
            autoFocus
            value={userName}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChange}
            inputProps={{
              pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$',
              title:
                'Minimum eight characters, at least one letter and one number',
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Link href="/goit-react-hw-08-phonebook/login" variant="body2">
            {'Do you have an account? Log in'}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
