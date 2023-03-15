import { Typography, Button, Box } from '@mui/material';
import { useAuth } from 'shared/hooks/useAuth';
import { useLogoutUserMutation } from 'redux/api/contacts/users/usersApi';
export default function UserMenu() {
  const [logout] = useLogoutUserMutation();
  const { user, isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Typography
        noWrap
        component="p"
        sx={{ display: { xs: 'none', sm: 'block', fontWeight: 500 } }}
      >
        {user.email}
      </Typography>
      <Button onClick={logout} color="inherit">
        LOGOUT
      </Button>
    </Box>
  ) : (
    <Button href="/goit-react-hw-08-phonebook/login" color="inherit">
      LOGIN
    </Button>
  );
}
