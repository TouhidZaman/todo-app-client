import Joi from "joi";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useAuthState } from "react-firebase-hooks/auth";
import axiosInstance from "../../../../api/axiosInstance";
import Swal from "sweetalert2";
import auth from "../../../../firebase/firebase.init";

const AddTask = ({ tasks, setTasks }) => {
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const schema = Joi.object({
        description: Joi.string().required(),
        task: Joi.string().required(),
    });

    //React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: joiResolver(schema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        const addedBy = user?.email;
        const newTask = {
            ...data,
            completed: false,
            addedBy,
        };

        try {
            await axiosInstance.post("tasks", newTask).then((response) => {
                // console.log(response.data);
                setLoading(false);
                console.log(response.data);
                if (response.data?.acknowledged) {
                    Swal.fire({
                        icon: "success",
                        title: "Your Task has been saved",
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    //To update local state when data is inserted
                    newTask._id = response.data.insertedId;
                    const updatedTasks = [...tasks];
                    updatedTasks.push(newTask)
                    console.log(updatedTasks);
                    setTasks(updatedTasks);

                    reset(); //To reset form
                }
            });
        } catch (error) {
            setLoading(false);
            setError(error.message);
            console.log("axios error:", error?.message);
        }
    };

    //Handling loading state
    if (loading) {
        return <p className="text-3xl text-center my-20">Loading...</p>;
    }

    return (
        <div className="rounded-lg shadow px-10 py-6 w-full mx-auto mb-8">
            <h3 className="mb-6 text-3xl text-primary">Add Task Form</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                    <input
                        placeholder="Your Task Name"
                        className="input input-bordered input-primary w-full max-w-lg"
                        {...register("task")}
                    />
                    <p className="text-red-400">{errors.task?.message}</p>
                </div>
                <div className="mb-6">
                    <input
                        placeholder="Your Task Description"
                        className="input input-bordered input-primary w-full max-w-lg"
                        {...register("description")}
                    />
                    <p className="text-red-400">{errors.description?.message}</p>
                </div>
                {error && <p className="text-red-400">{error?.message}</p>}
                <input
                    className="btn btn-active btn-primary text-white"
                    type="submit"
                    value={"Add Task"}
                />
            </form>
        </div>
    );
};

export default AddTask;
