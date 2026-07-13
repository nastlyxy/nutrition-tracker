import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layouts/MainLayout";
import Tracker from "./pages/Tracker";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false}/>
        <Routes>
          {!user ? (
            <Route path="*" element={<Login />}></Route>
          ) : (
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Tracker />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          )}
        </Routes>
    </Router>
  );
}

export default App;
