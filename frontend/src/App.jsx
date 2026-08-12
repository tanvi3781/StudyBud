import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TopicsPage from "./pages/TopicsPage";
import RoomPage from "./pages/RoomPage";
import CreateRoom from "./pages/CreateRoom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Messages from "./components/Messages";
import ProfilePage from "./pages/ProfilePage";
// import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <>

      <Messages />
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/topics" element={<TopicsPage />} />

          <Route path="/room/:id" element={<RoomPage />} />

          <Route path="/create-room" element={<CreateRoom />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/profile/:id" element={<ProfilePage />} />
{/*           
          <Route path="/update-user" element={<EditProfile />} /> */}

          {/* <Route
                    path="/create-room"
                    element={<RoomForm />}
                /> */}

        </Routes>
    </>
  );
}

export default App;