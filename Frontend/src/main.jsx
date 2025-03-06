import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Error from "./components/Error.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Video = lazy(() => import("./pages/Video.jsx"));
const SignIn = lazy(() => import("./pages/SignIn.jsx"));
const Search = lazy(() => import("./pages/Search.jsx"));
const Channel = lazy(() => import("./Components/Channel.jsx"));
const VideoUpload = lazy(() => import("./Components/VideoUpload.jsx"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<p className="text-center text-lg">Wait...</p>}>
            <Home type="random" />
          </Suspense>
        ),
      },
      {
        path: "trends",
        element: (
          <Suspense fallback={<p className="text-center text-lg">Wait...</p>}>
            <Home type="trend" />
          </Suspense>
        ),
      },
      {
        path: "subscriptions",
        element: (
          <Suspense fallback={<p className="text-center text-lg">Wait...</p>}>
            <Home type="sub" />
          </Suspense>
        ),
      },
      {
        path: "search",
        element: (
          <Suspense fallback={<p className="text-center text-lg">Wait...</p>}>
            <Search />
          </Suspense>
        ),
      },
      {
        path: "channel",
        element: (
          <Suspense fallback={<p className="text-center text-lg">Wait...</p>}>
            <Channel />
          </Suspense>
        ),
      },
      {
        path: "signin",
        element: (
          <Suspense fallback={<p className="text-center text-lg">Wait...</p>}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: "video/:id",
        element: (
          <Suspense fallback={<p className="text-center text-lg">Wait...</p>}>
            <Video />
          </Suspense>
        ),
      },
      {
        path: "upload",
        element:(
          <Suspense fallback={<p className="text-center text-lg">Wait...</p>}>
              <VideoUpload/>
          </Suspense>
        ),
      },
      {
        path: "profile",
        element:(
          <Suspense fallback={<p className="text-center text-lg">Wait...</p>}>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
