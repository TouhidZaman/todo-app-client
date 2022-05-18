import React from 'react';
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const TaskLists = ({tasks}) => {
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
                                <td>{task.task}</td>
                                <td>{task.description}</td>
                                <td>
                                <button
                                        // onClick={() => navigate(`/inventory/${inventoryItem._id}`)}
                                        className="hover:text-green-300 mr-2"
                                    >
                                        <FontAwesomeIcon
                                            className="text-lg pr-2"
                                            icon={faCheckCircle}
                                        />
                                    </button>
                                    <button
                                        // onClick={() => deleteItem(inventoryItem._id)}
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