import { LinearProgress, Container } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import {lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from 'router/Layout';
import { PrivateRoute } from 'router/PrivateRoute';
import { RestrictedRoute } from 'router/RestrictedRoute';
import { useAuth } from 'shared/hooks/useAuth';
import { useGetCurrentUserQuery } from 'redux/api/contacts/users/usersApi';
const ContactsPages = lazy(() => import('pages/ContactsPages/ContactsPages'));
const SignupPages = lazy(() => import('pages/SignupPage/SignupPage'));
const SignInPages = lazy(() => import('pages/SignInPage/SignInPage'));

function App() {
  useGetCurrentUserQuery();
  const { isRefreshing } = useAuth();

  return isRefreshing ? (
    <Container>
      <LinearProgress />
    </Container>
  ) : (
    <Routes>
      <Route path="/goit-react-hw-08-phonebook" element={<Layout />}>
        <Route
          path="/goit-react-hw-08-phonebook/login"
          element={
            <RestrictedRoute
              redirectTo="/goit-react-hw-08-phonebook/contacts"
              component={<SignInPages />}
            />
          }
        />
        <Route
          path="/goit-react-hw-08-phonebook/register"
          element={
            <RestrictedRoute
              redirectTo="/goit-react-hw-08-phonebook/contacts"
              component={<SignupPages />}
            />
          }
        />
        <Route
          path="/goit-react-hw-08-phonebook/contacts"
          element={
            <PrivateRoute
              redirectTo="/goit-react-hw-08-phonebook/login"
              component={<ContactsPages />}
            />
          }
        />
        <Route
          path="*"
          element={
            <RestrictedRoute
              redirectTo="/goit-react-hw-08-phonebook/contacts"
              component={<ContactsPages />}
            />
          }
        />
      </Route>
    </Routes>
    // // <Container sx={{ position: 'relative' }}>
    //   {/* <AppBar position="static">
    //     <Toolbar>
    //       <Typography
    //         variant="h6"
    //         noWrap
    //         component="p"
    //         sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
    //       >
    //         Phone Book
    //       </Typography>
    //       <SearchContact changeFilter={changeFilter} value={filterValue} />
    //     </Toolbar>
    //   </AppBar> */}

    //   //<SignInPages />

    //   {/* <main>
    //     <section>
    //       {isFetching && <LinearProgress />}
    //       {contacts && <Contacts contacts={contacts} />}
    //       <Fab
    //         sx={{ position: 'sticky', bottom: 20 }}
    //         aria-label={'Add contact'}
    //         color={'primary'}
    //         onClick={() => {
    //           setIsOpenDialog(true);
    //         }}
    //       >
    //         <Add />
    //       </Fab>
    //       <DialogAddContact
    //         isOpen={isOpenDialog}
    //         onClose={onClose}
    //         contacts={contacts}
    //       />
    //     </section>
    //   </main> */}
    // //   <ToastContainer position="top-center" autoClose={3000} />
    // // </Container>
  );
}

export default App;
