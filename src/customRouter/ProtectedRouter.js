import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import Header from "../components/Navbar/Header";

const ProtectedRouter = ({ component: Component, ...rest }) => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const { theme } = useSelector((state) => state.global);
  if (isLoading) return <Loading />;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && user?.role !== 0 ? (
          <Redirect to="/dashboard" />
        ) : isAuthenticated ? (
          <React.Fragment>
            <div
              id="main"
              className={theme === "light" ? "theme-light" : "theme-dark"}
            >
              <Header />
              <Component {...rest} {...props} />
            </div>
          </React.Fragment>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRouter;
