import React from "react";
import {
  RouteProps as ReactDomRouteProps,
  Navigate,
  Route as ReactDomRoute,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

interface RoutesProps extends ReactDomRouteProps {
  isPrivate?: boolean;
  component: any;
}

const Route = ({
  isPrivate = false,
  component: Component,
  ...rest
}: RoutesProps) => {
  const { user } = useAuth();
  console.log("aquidii");

  return (
    <ReactDomRoute
      {...rest}
      element={
        isPrivate === !!user ? (
          <Component />
        ) : (              
          <Navigate
            to={{
              pathname: isPrivate ? "/" : "/",
            }}
          />
        )
      }
    />
  );
};

export default Route;
