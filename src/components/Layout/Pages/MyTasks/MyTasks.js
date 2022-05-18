import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../api/axiosInstance";
import auth from "../../../../firebase/firebase.init";
import AddTask from "./AddTask";
import TaskLists from "./TaskLists";

const MyTasks = () => {
    const [user] = useAuthState(auth);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //Loading Products
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const { data } = await axiosInstance.get(
                    `tasks?addedBy=${user?.email}`
                );
                setTasks(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        getProducts();
    }, [user, navigate]);

    if (loading) {
        return <p className="text-3xl text-center my-20">Loading...</p>;
    }

    return (
        <div className="my-2 w-2/3 mx-auto text-center p-8">
            <AddTask tasks={tasks} setTasks={setTasks}/>
            <TaskLists tasks={tasks} />
        </div>
    );
};

export default MyTasks;
