import { Link, Outlet } from "react-router-dom";
import { UserAccessibleRouterElement } from "./router";
import { useAuth } from "./useAuth";

function SideBar({
  routerData,
}: {
  routerData: UserAccessibleRouterElement[];
}) {
  const auth = useAuth();

  const filteredRouterData = routerData.filter((router) => {
    if (auth.user) {
      // 사용자가 로그인한 경우, 모든 라우터 포함
      return true;
    } else {
      // 사용자가 로그인하지 않은 경우, withAuth가 false인 라우터만 포함
      return !router.withAuth;
    }
  });

  return (
    <ul>
      {filteredRouterData.map((router) => (
        <li key={router.id}>
          <Link to={router.path}>{router.label}</Link>
        </li>
      ))}
      <Outlet />
    </ul>
  );
}

export default SideBar;
