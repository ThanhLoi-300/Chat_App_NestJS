import { PropsWithChildren, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ConversationChannelPage } from "./pages/conversations/ConversationChannelPage";
import { ConversationPage } from "./pages/conversations/ConversationPage";
import { AuthContext } from "./utils/context/AuthContext";
import { User } from "./utils/types";
import { store } from "./store";
import { Provider as ReduxProvider } from 'react-redux';
import { enableMapSet } from 'immer'
import { GroupChannelPage } from './pages/group/GroupChannelPage';
import { GroupPage } from './pages/group/GroupPage';
import { GroupPageGuard } from './guards/GroupPageGuard';
import { AppPage } from './pages/AppPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PusherContext, PusherProvider } from "./utils/context/PusherContext";
import Pusher from 'pusher-js';
import { FriendsLayoutPage } from "./pages/friends/FriendsLayoutPage";
import { FriendRequestPage } from "./pages/friends/FriendRequestPage";

enableMapSet()

type Props = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

function AppWithProviders({
  children,
  user,
  setUser,
}: PropsWithChildren & Props) {
  return (
    <ReduxProvider store={store}>
      <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
        {children}
      </AuthContext.Provider>
    </ReduxProvider>
  );
}

function App() {
  const [user, setUser] = useState<User>();
  return (
    <>
      <BrowserRouter>
        <AppWithProviders user={user} setUser={setUser}>
          <Routes>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route element={<AuthenticatedRoute children={<AppPage />} />}>
              <Route path="/conversations" element={ <ConversationPage /> } >
                <Route path=":id" element={<ConversationChannelPage />}></Route>
              </Route>

              <Route path="/groups" element={<GroupPage />}>
                <Route path=":id"
                  element={<GroupPageGuard children={<GroupChannelPage />} />}
                />
              </Route>

              <Route path="friends" element={<FriendsLayoutPage />}>
                <Route path="requests" element={<FriendRequestPage />} />
                <Route path="blocked" element={<div>Blocked</div>} />
              </Route>
            </Route>
          </Routes>
          <ToastContainer theme="dark" />
        </AppWithProviders>
      </BrowserRouter>
    </>
  );
}

export default App;
