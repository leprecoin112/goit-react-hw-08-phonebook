import { Navigate } from 'react-router-dom';
import { useAuth } from 'shared/hooks/useAuth';
export const PrivateRoute = ({
  component: Component,
  redirectTo = '/goit-react-hw-08-phonebook',
}) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isRefreshing && !isLoggedIn;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
