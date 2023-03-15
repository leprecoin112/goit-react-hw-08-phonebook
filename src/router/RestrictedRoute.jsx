import { Navigate } from 'react-router-dom';
import { useAuth } from 'shared/hooks/useAuth';
export const RestrictedRoute = ({
  component: Component,
  redirectTo = '/goit-react-hw-08-phonebook',
}) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
