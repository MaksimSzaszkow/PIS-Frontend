import s from "./PisNavbar.module.css";
import React from "react";
import {NAVBAR_CONFIG} from "../../config/navbar-config";
import PisLinkButton from "../PisLinkButton/PisLinkButton";

function PisNavbar() {
    return (
        <div className={s.navbar}>
            {NAVBAR_CONFIG.map((item, index) => (
                <PisLinkButton
                    key={`nav-button-${index}`}
                    linkProps={{to: item.route}}
                >
                    {item.text}
                </PisLinkButton>
            ))}
        </div>
    )
}

export default PisNavbar;