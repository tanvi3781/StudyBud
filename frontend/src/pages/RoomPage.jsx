import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

import RoomHeader from "../components/RoomHeader";
import MessageList from "../components/MessageList";
import MessageForm from "../components/MessageForm";
import Participants from "../components/Participants";


function RoomPage() {

    const { id } = useParams();

    const [roomData, setRoomData] = useState(null);


    useEffect(() => {
        fetchRoom();
    }, [id]);


    const fetchRoom = async () => {

        try {

            const response = await api.get(`/rooms/${id}/`);

            setRoomData(response.data);

        } catch (error) {

            console.log("Error loading room:", error);

        }

    };


    if (!roomData) {
        return <h2>Loading room...</h2>;
    }


    return (

        <main className="profile-page layout layout--2">

            <div className="container">


                <div className="room">


                    <RoomHeader 
                        room={roomData.room}
                    />


                    <MessageList
                        messages={roomData.messages}
                    />


                    <MessageForm

                        roomId={id}

                        refreshRoom={fetchRoom}

                    />


                </div>



                <Participants
                    participants={roomData.participants}
                />


            </div>


        </main>

    );

}


export default RoomPage;