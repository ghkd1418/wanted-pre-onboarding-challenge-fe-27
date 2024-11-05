import { Link, Outlet } from "react-router-dom";
import { UserAccessibleRouterElement } from "../app/router";

function SideBar({
  routerData,
}: {
  routerData: UserAccessibleRouterElement[];
}) {
  return (
    <ul>
      {routerData.map((router) => (
        <li key={router.id}>
          <Link to={router.path}>{router.label}</Link>
        </li>
      ))}
      <Outlet />
    </ul>
  );
}

export default SideBar;
