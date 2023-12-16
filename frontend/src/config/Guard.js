// Guard.js
import { GuardProvider, GuardedRoute } from 'react-router-guard';

const Guard = ({ children }) => {
  return (
    <GuardProvider>
      <GuardedRoute
        path="/admin"
        meta={{ role: "admin" }}
        component={({ children }) => <>{children}</>}
      />
      <GuardedRoute
        path="/"
        meta={{ role: "user" }}
        component={({ children }) => <>{children}</>}
      />
      {children}
    </GuardProvider>
  );
};

export default Guard;

Guard.propTypes = {
    children: Guard.node,
  };
  
