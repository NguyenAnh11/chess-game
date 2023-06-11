import React, { Suspense, lazy } from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Loading from "./pages/Loading";
import PrivateRoute from "./routers/PrivateRoute";
import SocketProvider from "./contexts/SocketContext";
import RoomProvider from "./contexts/RoomContext";
import ChatProvider from "./contexts/ChatContext";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Offline = lazy(() => import("./pages/Offline"));
const Online = lazy(() => import("./pages/Online"));
const Room = lazy(() => import("./pages/Room"));

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route element={<PrivateRoute />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/offline"
            element={
              <Suspense fallback={<Loading />}>
                <Offline />
              </Suspense>
            }
          />
          <Route
            path="/online"
            element={
              <Suspense fallback={<Loading />}>
                <SocketProvider>
                  <Online />
                </SocketProvider>
              </Suspense>
            }
          />
          <Route
            path="/live/:code"
            element={
              <Suspense fallback={<Loading />}>
                <SocketProvider>
                  <ChatProvider>
                    <RoomProvider>
                      <Room />
                    </RoomProvider>
                  </ChatProvider>
                </SocketProvider>
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;
