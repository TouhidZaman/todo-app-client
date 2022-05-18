import React from "react";
import { NavLink } from "react-router-dom";

const NavigationItems = () => {

    return (
        <>
            <li>
                <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
                <NavLink to={"/my-tasks"}>My Tasks</NavLink>
            </li>
            <li>
                <NavLink to={"/about"}>About</NavLink>
            </li>
            
        </>
    );
};

export default NavigationItems;
