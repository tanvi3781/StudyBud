import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TopicsPage from "./pages/TopicsPage";
import RoomPage from "./pages/RoomPage";
import CreateRoom from "./pages/CreateRoom";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/topics" element={<TopicsPage />} />

      <Route path="/room/:id" element={<RoomPage />} />

      <Route path="/create-room" element={<CreateRoom />} />

    </Routes>
  );
}

export default App;