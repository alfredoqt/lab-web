import React from "react";
import { Redirect } from "react-router-dom";

import * as ROUTES from "constants/routes";

function AuthRenderer({ children, fallback }) {
  const savedPlayer = localStorage.getItem("player");

  if (savedPlayer == null) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return children;
}

export default AuthRenderer;
