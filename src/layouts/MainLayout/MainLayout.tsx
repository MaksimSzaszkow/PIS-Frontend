import PisNavbar from "../../components/PisNavbar/PisNavbar";
import s from "./MainLayout.module.css";

function MainLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className={s.layout}>
      <PisNavbar />
      <div className={s.content}>{children}</div>
    </div>
  );
}

export default MainLayout;
