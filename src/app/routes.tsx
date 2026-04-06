import { createBrowserRouter } from "react-router";
import MobileLayout from "./components/layout/MobileLayout";
import RunsList from "./components/runs/RunsList";
import AddRun from "./components/runs/AddRun";
import RunDetail from "./components/runs/RunDetail";
import HorsesList from "./components/horses/HorsesList";
import HorseDetail from "./components/horses/HorseDetail";
import ArenasList from "./components/arenas/ArenasList";
import AccountPage from "./components/account/AccountPage";
import Landing from "./components/marketing/Landing";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Subscribe from "./components/subscription/Subscribe";
import ProtectedRoute from "./components/auth/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/subscribe",
    Component: Subscribe,
  },
  {
    path: "/app",
    Component: ProtectedRoute,
    children: [
      {
        path: "",
        Component: MobileLayout,
        children: [
          { index: true, Component: RunsList },
          { path: "runs", Component: RunsList },
          { path: "runs/add", Component: AddRun },
          { path: "runs/:id", Component: RunDetail },
          { path: "horses", Component: HorsesList },
          { path: "horses/:id", Component: HorseDetail },
          { path: "arenas", Component: ArenasList },
          { path: "account", Component: AccountPage },
        ],
      },
    ],
  },
]);