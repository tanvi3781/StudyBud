import { Link } from "react-router-dom";

function Topics({ topics, roomCount }) {
  return (
    <div className="topics">

      <div className="topics__header">
        <h2>Browse Topics</h2>
      </div>

      <ul className="topics__list">

        {/* ================= ALL ================= */}

        <li>
          <Link to="/" className="active">
            All <span>{roomCount || 0}</span>
          </Link>
        </li>


        {/* ================= TOPICS ================= */}

        {topics?.map((topic) => (

          <li key={topic.id}>

            <Link
              to={`/?q=${encodeURIComponent(topic.name)}`}
            >

              {topic.name}

              <span>
                {topic.room_count ?? 0}
              </span>

            </Link>

          </li>

        ))}

      </ul>


      {/* ================= MORE ================= */}

      <Link
        className="btn btn--link"
        to="/topics"
      >

        More

        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >

          <title>
            chevron-down
          </title>

          <path d="M16 21l-13-13h-3l16 16 16-16h-3l-13 13z"></path>

        </svg>

      </Link>

    </div>
  );
}

export default Topics;