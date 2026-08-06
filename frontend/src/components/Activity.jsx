import { Link } from "react-router-dom";

function Activity({ messages }) {
  return (
    <div className="activities">

      <div className="activities__header">
        <h2>Recent Activities</h2>
      </div>

      {messages.length === 0 ? (
        <p>No recent activity</p>
      ) : (
        messages.map((message) => (
          <div
            className="activities__box"
            key={message.id}
          >

            <div className="activities__boxHeader roomListRoom__header">

              <Link
                to={`/profile/${message.user}`}
                className="roomListRoom__author"
              >
                <div className="avatar avatar--small active">

                  <img
                    src="https://randomuser.me/api/portraits/men/37.jpg"
                    alt=""
                  />

                </div>

                <p>
                    @{message.user.username}
                    <span>
                        {new Date(message.created).toLocaleDateString()}
                    </span>
                </p>

              </Link>

            </div>

            <div className="activities__boxContent">

              <p>
                replied to post "
                <Link to={`/room/${message.room.id}`}>
                    {message.room.name}
                </Link>
                "
              </p>

              <div className="activities__boxRoomContent">
                {message.body}
              </div>

            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default Activity;