import React from "react";
import PisNavbar from "../../components/PisNavbar/PisNavbar";
import s from "./MainLayout.module.css";
import AuthGate from "../../utils/AuthGate";

function MainLayout({children}: React.PropsWithChildren<{}>) {
    return (
        <AuthGate>
            <div className={s.layout}>
                <PisNavbar/>
                <div className={s.content}>
                    {children}
                </div>
            </div>
        </AuthGate>
    );
}

export default MainLayout;