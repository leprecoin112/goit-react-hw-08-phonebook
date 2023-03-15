import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import {
  Container,
  AppBar,
  Toolbar,
  Button,
  LinearProgress,
} from '@mui/material';
import SearchContact from 'shared/components/SearchContact';
import UserMenu from 'shared/components/UserMenu/UserMenu';

export default function Layout() {
  return (
    <Container sx={{ position: 'relative' }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button
            sx={{
              textTransform: 'none',
              fontSize: '20px',
            }}
            href="/goit-react-hw-08-phonebook/contacts"
            color="inherit"
          >
            Phone Book
          </Button>
          <SearchContact />
          <UserMenu />
        </Toolbar>
      </AppBar>
      <Suspense
        fallback={
          <Container>
            <LinearProgress />
          </Container>
        }
      >
        <Outlet />
      </Suspense>

      <ToastContainer position="top-center" autoClose={3000} />
    </Container>
  );
}
