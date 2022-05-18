import React from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../../firebase/firebase.init";

const NavigationItems = () => {
    const [user] = useAuthState(auth);

    return (
        <>
            <li>
                <NavLink to={"/"}>Home</NavLink>
            </li>
            {/* <li>
                <NavLink to={"/about"}>About</NavLink>
            </li> */}
            {user ? (
                <>
                    <li>
                        <NavLink to={"/my-tasks"}>My Tasks</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={() => signOut(auth)} to={"/login"}>
                            Sign-Out
                        </NavLink>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <NavLink to={"/login"}>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/sign-up"}>Sign-Up</NavLink>
                    </li>
                </>
            )}
        </>
    );
};

export default NavigationItems;
