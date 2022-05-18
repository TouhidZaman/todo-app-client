import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../../../firebase/firebase.init";

const Home = () => {
    const [user] = useAuthState(auth);

    const navigate = useNavigate();

    return (
        <div className="hero min-h-screen bg-base-100">
            <div className="hero-content text-center">
                <div className="max-w-lg">
                    <h1 className="text-5xl text-primary font-bold">
                        {user?.displayName
                            ? `Welcome ${user?.displayName}`
                            : "Hello there"}
                    </h1>
                    <p className="py-6">
                        This is a world class todo app. here you can store your task
                        list. that will help you to remember your tasks later on. to
                        get started click get started button
                    </p>
                    <button onClick={()=> navigate('/my-tasks')} className="btn btn-primary text-white">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
