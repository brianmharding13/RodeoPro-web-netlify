import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router";
import Landing from "./components/marketing/Landing";
import PrivacyPolicy from "./components/marketing/PrivacyPolicy";
import TermsOfService from "./components/marketing/TermsOfService";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import ResetPassword from "./components/auth/ResetPassword";
import Subscribe from "./components/subscription/Subscribe";
import AccountPage from "./components/account/AccountPage";
import DeleteAccount from "./components/account/DeleteAccount";
import Download from "./components/marketing/Download";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
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
        path: "/privacy",
        Component: PrivacyPolicy,
      },
      {
        path: "/terms",
        Component: TermsOfService,
      },
      {
        path: "/download",
        Component: Download,
      },
      {
        path: "/reset-password",
        Component: ResetPassword,
      },
      {
        path: "/delete",
        Component: DeleteAccount,
      },
      {
        path: "/dashboard",
        Component: ProtectedRoute,
        children: [
          { index: true, Component: AccountPage },
        ],
      },
    ],
  },
]);
