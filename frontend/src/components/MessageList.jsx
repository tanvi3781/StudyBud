import { useState } from "react";
import timeAgo from "../utils/timeAgo";
import api from "../api/axios";


function MessageList({ messages, refreshRoom }) {

    const [deleteId, setDeleteId] = useState(null);


    const deleteMessage = async () => {

        try {

            await api.delete(
                `/messages/delete/${deleteId}/`
            );


            // Close the popup
            setDeleteId(null);


            // Fetch the updated messages from backend
            await refreshRoom();


        } catch (error) {

            console.log(
                "Delete message error:",
                error.response?.data || error.message
            );

        }

    };


    return (

        <div className="room__conversation">

            <div className="threads scroll">

                {messages.length === 0 && (
                    <p>No messages yet</p>
                )}


                {messages.map((message) => (

                    <div
                        className="thread"
                        key={message.id}
                    >


                        <div className="thread__top">


                            <div className="thread__author">


                                <span>
                                    @{message.user.username}
                                </span>


                                <span className="thread__date">

                                    {timeAgo(message.created)}

                                </span>


                            </div>


                            {/* DELETE BUTTON */}

                            <button
                                className="delete-message"
                                onClick={() =>
                                    setDeleteId(message.id)
                                }
                                title="Delete message"
                            >
                                ×
                            </button>


                        </div>


                        <div className="thread__details">

                            {message.body}

                        </div>


                    </div>

                ))}


            </div>


            {/* DELETE CONFIRMATION POPUP */}

            {deleteId && (

                <div className="delete-popup">


                    <div className="delete-popup__box">


                        <h3>
                            Delete message?
                        </h3>


                        <p>
                            Are you sure you want to delete this message?
                        </p>


                        <div className="delete-popup__actions">


                            {/* NO */}

                            <button
                                className="btn btn--dark"
                                onClick={() =>
                                    setDeleteId(null)
                                }
                            >
                                No
                            </button>


                            {/* YES */}

                            <button
                                className="btn btn--main"
                                onClick={deleteMessage}
                            >
                                Yes
                            </button>


                        </div>


                    </div>


                </div>

            )}


        </div>

    );

}


export default MessageList;