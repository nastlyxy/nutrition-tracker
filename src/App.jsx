import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Tracker from "./pages/Tracker";
import Profile from "./pages/Profile";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
        <Route index element={<Tracker/>}/>
        <Route path="profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
