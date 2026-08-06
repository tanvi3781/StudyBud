import { Link } from "react-router-dom";


function RoomList({ rooms }) {


  return (

    <>

      {rooms?.map((room) => (

        <div 
          className="roomListRoom" 
          key={room.id}
        >


          <div className="roomListRoom__header">


            {room.host && (

              <Link
                to={`/profile/${room.host.id}`}
                className="roomListRoom__author"
              >

                <div className="avatar avatar--small active">

                  <img
                    src="https://randomuser.me/api/portraits/men/11.jpg"
                    alt=""
                  />

                </div>


                <span>
                  {room.host.username}
                </span>


              </Link>

            )}



            <div className="roomListRoom__actions">

              <span>

                {room.created 
                  ? new Date(room.created).toLocaleDateString()
                  : ""
                }

              </span>

            </div>


          </div>




          <div className="roomListRoom__content">


            <Link to={`/room/${room.id}`}>

              {room.name}

            </Link>



            <p>

              {room.description}

            </p>


          </div>





          <div className="roomListRoom__meta">


            <Link
              to={`/room/${room.id}`}
              className="roomListRoom__joined"
            >

              👥 {room.participants?.length || 0} participants joined

            </Link>




            <p className="roomListRoom__topic">

              {room.topic?.name || "No Topic"}

            </p>



          </div>



        </div>

      ))}


    </>

  );

}


export default RoomList;