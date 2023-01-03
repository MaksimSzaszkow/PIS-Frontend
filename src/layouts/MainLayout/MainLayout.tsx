import React from "react";
import PisNavbar from "../../components/PisNavbar/PisNavbar";

function MainLayout({children}: React.PropsWithChildren<{}>) {
return (
    <div>
        <PisNavbar/>
        {children}
    </div>
);
}

export default MainLayout;