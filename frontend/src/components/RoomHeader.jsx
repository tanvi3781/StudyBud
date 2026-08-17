import { Link } from "react-router-dom";
import timeAgo from "../utils/timeAgo";

function RoomHeader({ room }) {


    return (

        <div className="room__top">


            <div className="room__topLeft">

                <Link to="/">

                    <span>←</span>

                </Link>


                <h3>Study Room</h3>

            </div>



            <div className="room__header">


                <div className="room__info">

                    <h3>
                        {room.name}
                    </h3>


                    <span>
                        {room.created ? timeAgo(room.created) : ""}
                    </span>


                </div>



                <div className="room__hosted">


                    <p>
                        Hosted By
                    </p>


                    <div className="room__author">


                        <div className="avatar avatar--small">

                            <img 
                              src="https://randomuser.me/api/portraits/men/37.jpg"
                              alt=""
                            />

                        </div>


                        <span>
                            @{room.host.username}
                        </span>


                    </div>


                </div>



                <span className="room__topics">

                    {room.topic.name}

                </span>


            </div>


        </div>

    );

}


export default RoomHeader;