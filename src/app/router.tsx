import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import RequireAuth from "../pages/RequireAuth";
import Todo from "../pages/Todo";
import Auth from "../pages/Auth";
import SideBar from "./SideBar";

interface RouterBase {
  id: number;
  path: string;
  label: string;
  element: React.ReactNode;
}

export interface UserAccessibleRouterElement extends RouterBase {
  withAuth?: boolean; // 인증이 필요한 페이지 여부
}

export const routerData: UserAccessibleRouterElement[] = [
  { id: 0, path: "/", element: <Home />, label: "Home", withAuth: false },
  { id: 1, path: "/todos", element: <Todo />, label: "Todo", withAuth: true },
  {
    id: 2,
    path: "/auth",
    element: <Auth />,
    label: "Auth",
    withAuth: false,
  },
];

export const routers = createBrowserRouter([
  {
    element: <SideBar routerData={routerData} />,
    children: [
      ...routerData.map((router) => {
        if (router.withAuth) {
          return {
            path: router.path,
            element: <RequireAuth>{router.element}</RequireAuth>,
          };
        }
        return {
          path: router.path,
          element: router.element,
        };
      }),
    ],
  },
]);

// const SidebarContent = routerData.

/**
 * 
export const SidebarContent: SidebarElement[] = routerData.reduce(
  (prev, router) => {
    // TODO 4-1. isAdminOnly 프로퍼티를 추가하여 admin 페이지로 가는 사이드바 요소를 선택적으로 렌더링 (어드민에게만 보이도록 하기)
    if (!router.withAuth) return prev;

    return [
      ...prev,
      {
        id: router.id,
        path: router.path,
        label: router.label,
      },
    ];
  },
  [] as SidebarElement[]
);
 */
