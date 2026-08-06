import { useState } from "react";
import api from "../api/axios";


function MessageForm({ roomId, refreshRoom }) {

    const [body, setBody] = useState("");



    const sendMessage = async (e) => {

        e.preventDefault();


        if (!body.trim()) {
            return;
        }


        try {

            await api.post("/messages/create/", {

                room: roomId,
                body: body

            });


            setBody("");


            // reload messages
            refreshRoom();


        } catch (error) {

            console.log(
                "Message error:",
                error.response?.data || error.message
            );

        }

    };



    return (

        <div className="room__message">


            <form onSubmit={sendMessage}>


                <input

                    name="body"

                    value={body}

                    onChange={(e) =>
                        setBody(e.target.value)
                    }

                    placeholder="Write your message here..."

                />


            </form>


        </div>

    );

}


export default MessageForm;