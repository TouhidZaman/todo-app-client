import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./components/Layout/Pages/About/About";
import Login from "./components/Layout/Pages/Auth/Login/Login";
import Signup from "./components/Layout/Pages/Auth/Signup/Signup";
import Home from "./components/Layout/Pages/Home/Home";
import MyTasks from "./components/Layout/Pages/MyTasks/MyTasks";
import NotFound from "./components/Layout/Pages/NotFound/NotFound";
import RequireAuth from "./components/Layout/Pages/RequireAuth";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route
                path="/my-tasks"
                element={
                    <RequireAuth>
                        <MyTasks />
                    </RequireAuth>
                }
            />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
