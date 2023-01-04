import React from "react";
import {Navigate} from "react-router-dom";
import {ROUTES} from "../config/routes";

const isUserLoggedIn = true;

function AuthGate({children}: React.PropsWithChildren<{}>) {

    if (!isUserLoggedIn) {
        return <Navigate to={ROUTES.login}/>
    }

    return <>{children}</>
}

export default AuthGate;

