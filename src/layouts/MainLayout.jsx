import { Link, Outlet } from "react-router-dom";

import logo from "../assets/images/SimplyCalo.png";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-sky-50 py-8 px-4 sm:px-8 font-sans">
      <div className="mx-auto max-w-2xl">
        <nav className="bg-white rounded-2xl shadow-sm p-5 mb-8 flex items-center justify-between">
          <Link to={"/"}>
            <img className="h-12 w-auto" src={logo} alt="logo" />
          </Link>
          <div className="flex gap-7">
           <Link
            className="font-bold text-slate-700 hover:text-sky-500"
            to={"/"}
          >
            Tracker
          </Link>
          <Link
            className="font-bold text-slate-700 hover:text-sky-500"
            to={"/profile"}
          >
            Profile
          </Link> 
          </div>
          
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
