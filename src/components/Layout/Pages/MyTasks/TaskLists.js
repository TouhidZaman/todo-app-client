import React, { useState } from "react";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../../../api/axiosInstance";
import Swal from "sweetalert2";

const TaskLists = ({ tasks, setTasks }) => {
    const [loading, setLoading] = useState(false);
    //Delete Task item handler
    const handleDeleteTaskItem = async (taskId) => {
        const confirm = window.confirm("Are you sure ?");
        if (confirm) {
            setLoading(true);
            try {
                await axiosInstance.delete(`tasks/${taskId}`).then((response) => {
                    if (response.data?.acknowledged) {
                        Swal.fire({
                            icon: "success",
                            title: "Your Task deleted successfully",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        const filteredItems = tasks.filter(
                            (inventoryItem) => inventoryItem._id !== taskId
                        );
                        setTasks(filteredItems);
                        setLoading(false);
                    }
                });
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        }
    };

    //Task complete handler
    const handleTaskComplete = async (taskId) => {
        let url = `tasks/${taskId}`;
        try {
            await axiosInstance.put(url, { completed: true }).then((response) => {
                if (response.data?.acknowledged) {
                    const updatedTasks = tasks.map((task) =>
                        task._id === taskId ? { ...task, completed: true } : task
                    );
                    console.log(updatedTasks);
                    setTasks(updatedTasks);
                }
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    //Handling loading state
    if (loading) {
        return <p className="text-3xl text-center my-20">Loading...</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                {/* <!-- head --> */}
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task._id}>
                            <td>
                                <span
                                    className={task.completed ? "line-through" : ""}
                                >
                                    {task.task}
                                </span>
                            </td>
                            <td>
                                <span
                                    className={task.completed ? "line-through" : ""}
                                >
                                    {task.description}
                                </span>
                            </td>
                            <td>
                                <button
                                    disabled={task.completed}
                                    onClick={() => handleTaskComplete(task._id)}
                                    className={
                                        task.completed
                                            ? "line-through text-green-300 mr-2"
                                            : "hover:text-green-300 mr-2"
                                    }
                                >
                                    <FontAwesomeIcon
                                        className="text-lg pr-2"
                                        icon={faCheckCircle}
                                    />
                                </button>
                                <button
                                    onClick={() => handleDeleteTaskItem(task._id)}
                                    className="hover:text-red-500"
                                >
                                    <FontAwesomeIcon
                                        className="text-lg pr-2"
                                        icon={faTrashAlt}
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskLists;
