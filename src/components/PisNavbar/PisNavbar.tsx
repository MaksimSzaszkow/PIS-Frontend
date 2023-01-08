import s from "./PisNavbar.module.css";
import React, { useContext } from "react";
import { NAVBAR_CONFIG } from "../../config/navbar-config";
import PisLinkButton from "../PisLinkButton/PisLinkButton";
import PisButton from "../PisButton/PisButton";
import { AuthContext } from "../../contexts/AuthContext";

function PisNavbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className={s.navbar}>
      <div className={s.userName}>{`${user.email} | ${
        user.role || "no role"
      }`}</div>
      {NAVBAR_CONFIG.map((item, index) => (
        <PisLinkButton
          key={`nav-button-${index}`}
          linkProps={{ to: item.route }}
        >
          {item.text}
        </PisLinkButton>
      ))}
      <PisButton key={"nav-button-logout"} onClick={logout}>
        {"Wyloguj"}
      </PisButton>
    </div>
  );
}

export default PisNavbar;
