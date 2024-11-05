import { useNavigate } from "react-router-dom";
import { UserAccessibleRouterElement } from "./router";
import SideBar from "../widgets/SideBar";
import { useAuth } from "./useAuth";
import toast from "react-hot-toast";

function GlobalLayout({
  routerData,
}: {
  routerData: UserAccessibleRouterElement[];
}) {
  const navigate = useNavigate();
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

  const handleSignout = () => {
    auth.signout(() => {
      toast("로그아웃 되었습니다.");
      navigate("/");
    });
  };

  return (
    <>
      <SideBar routerData={filteredRouterData} />
      {auth.user && <button onClick={handleSignout}>로그아웃</button>}
    </>
  );
}

export default GlobalLayout;
