import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './Components/Error.jsx'; 
import AuthProvider from './context/AuthProvider.jsx'

const Home = lazy(() => import("./Components/Home.jsx"));
const Search = lazy(() => import("./Components/Search.jsx"));
const Channel = lazy(() => import("./Components/Channel.jsx"));
const PlayingVideo = lazy(() => import("./Components/PlayingVideo.jsx"));

const appRouter = createBrowserRouter (
  [
    {
      path: "/",
      element: <App />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element:
          <Suspense fallback={<p className="text-center text-lg">Wait...</p>}>
            <Home />
          </Suspense>
        },
        {
          path: "/search/:searchQuery",
          element:
          <Suspense fallback={<p className="text-center text-lg">Wait...</p>}> 
            <Search />
          </Suspense>
        },
        {
          path: "/video/:id",
          element:
          <Suspense fallback={<p className="text-center text-lg">Wait...</p>}> 
              <PlayingVideo />
          </Suspense>
        },
        {
          path: "channel",
          element:
          <Suspense fallback={<p className="text-center text-lg">Wait...</p>}> 
            <Channel />
          </Suspense>
        },
      ]
    },
  ]
)

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Suspense fallback={<p className="text-center text-lg">Wait...</p>}>
        <RouterProvider router={appRouter} />
    </Suspense>
  </AuthProvider>,
)
