import { Outlet, createBrowserRouter } from "react-router-dom";
import LinksNav from "@layout/LinksNav";
import PagesLayout from "@pages/PagesEditor/Layout";
import UserControls from "@components/UserControls";

import GuestNav from "@layout/GuestNav";
import useSession from "@lib/use-session";
import SignInPage from "@pages/SignIn";
import Home from "@pages/Home";
import NotFound from "@pages/NotFound";
import PageToolLayout from "@pages/PagesEditor/ToolLayout";
import { LayoutPanel } from "pages-tool-layout-panel";
import { LinesPanel } from "pages-tool-lines-panel";
import { InfoPanel } from "pages-tool-info-panel";
import { TranscriptionPanel } from "pages-tool-transcription-panel";
import { useRegisterSW } from "virtual:pwa-register/react";

function HomeLayout() {
  const session = useSession();

  const intervalMS = 60 * 60 * 1000;

  const updateServiceWorker = useRegisterSW({
    onRegistered(r) {
      r &&
        setInterval(() => {
          r.update();
        }, intervalMS);
    },
  });

  return (
    <>
      <nav className="h-[65px] w-full">
        {session ? (
          <LinksNav>
            <UserControls session={session} />
          </LinksNav>
        ) : (
          <GuestNav />
        )}
      </nav>
      <Outlet />
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/pages/:mediumId",
    loader: ({ params }) => params,
    element: <PagesLayout />,
    children: [
      {
        index: true,
        element: <h1>Pages Summary</h1>,
      },
      {
        path: ":pageId",
        element: <PageToolLayout />,
        children: [
          {
            path: "transcription",
            element: <TranscriptionPanel />,
          },
          {
            index: true,
            element: <InfoPanel />,
          },
          {
            path: "layout",
            element: <LayoutPanel />,
          },
          {
            path: "lines",
            element: <LinesPanel />,
          },
          {
            path: "segmentation",
            element: <h1> segmentation </h1>,
          },
          {
            path: "images",
            element: <h1> images </h1>,
          },
        ],
      },
    ],
  },
]);
