import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import RequireAuth from "../features/auth/RequireAuth";
import Todo from "../pages/Todo";
import Auth from "../pages/Auth";
import GlobalLayout from "./GlobalLayout";

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
    element: <GlobalLayout routerData={routerData} />,
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
