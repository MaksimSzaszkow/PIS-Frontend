import React, {ReactElement} from "react";
import {Navigate} from "react-router-dom";
import {ROUTES} from "../../config/routes";
import MainLayout from "../../layouts/MainLayout/MainLayout";

const isUserLoggedIn = true;

function LandingPage(): ReactElement {


    if(!isUserLoggedIn) {
       return <Navigate to={ROUTES.login}/>
    }

  return (
      <MainLayout>
        {isUserLoggedIn}
      </MainLayout>

  );
}

export default LandingPage;