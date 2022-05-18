import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./components/Layout/Pages/About/About";
import Home from "./components/Layout/Pages/Home/Home";
import MyTasks from "./components/Layout/Pages/MyTasks/MyTasks";
import NotFound from "./components/Layout/Pages/NotFound/NotFound";

const AppRoutes = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/my-tasks" element={<MyTasks />} />
         <Route path="/about" element={<About />} />
         <Route path="*" element={<NotFound />} />
      </Routes>
   );
};

export default AppRoutes;
