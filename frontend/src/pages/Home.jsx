import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Topics from "../components/Topics";
import RoomList from "../components/RoomList";
import Activity from "../components/Activity";
import api from "../api/axios";


function Home() {

  const [homeData, setHomeData] = useState(null);

  const [loading, setLoading] = useState(true);


  // ================= SEARCH =================

  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("q") || "";


  // ================= GET HOME DATA =================

  useEffect(() => {

    api
      .get(
        `/home/?q=${encodeURIComponent(searchQuery)}`
      )

      .then((res) => {

        setHomeData(res.data);

      })

      .catch((err) => {

        console.log(err);

      })

      .finally(() => {

        setLoading(false);

      });

  }, [searchQuery]);


  // ================= INITIAL LOADING =================

  if (loading && !homeData) {

    return <h2>Loading...</h2>;

  }


  return (

    <>

      <main className="layout layout--3">

        <div className="container">


          {/* ================= TOPICS ================= */}

          <Topics
            topics={homeData?.topics || []}
            roomCount={homeData?.room_count || 0}
          />


          {/* ================= ROOM LIST ================= */}

          <div className="roomList">


            {/* ================= MOBILE MENU ================= */}

            <div className="mobile-menu">

              <form
                className="header__search"
                onSubmit={(e) =>
                  e.preventDefault()
                }
              >

                <label>

                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >

                    <title>
                      search
                    </title>

                    <path d="M32 30.586l-10.845-10.845c1.771-2.092 2.845-4.791 2.845-7.741 0-6.617-5.383-12-12-12S0 5.383 0 12s5.383 12 12 12c2.949 0 5.649-1.074 7.741-2.845l10.845 10.845 1.414-1.414zM12 22c-5.514 0-10-4.486-10-10S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"></path>

                  </svg>


                  <input
                    type="text"
                    placeholder="Search for posts"
                    value={searchQuery}
                    readOnly
                  />

                </label>

              </form>


              {/* ================= MOBILE MENU ITEMS ================= */}

              <div className="mobile-menuItems">

                <Link
                  className="btn btn--main btn--pill"
                  to="/topics"
                >
                  Browse Topics
                </Link>


                <Link
                  className="btn btn--main btn--pill"
                  to="/activity"
                >
                  Recent Activities
                </Link>

              </div>

            </div>


            {/* ================= ROOM HEADER ================= */}

            <div className="roomList__header">

              <div>

                <h2>
                  Study Room
                </h2>

                <p>
                  {homeData?.room_count || 0} Rooms available
                </p>

              </div>


              <Link
                className="btn btn--main"
                to="/create-room"
              >
                Create Room
              </Link>

            </div>


            {/* ================= ROOMS ================= */}

            <RoomList
              rooms={homeData?.rooms || []}
            />

          </div>


          {/* ================= ACTIVITY ================= */}

          <Activity
            messages={homeData?.messages || []}
          />

        </div>

      </main>

    </>

  );
}

export default Home;