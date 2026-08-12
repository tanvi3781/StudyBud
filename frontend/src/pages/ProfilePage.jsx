import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import RoomList from "../components/RoomList";
import Topics from "../components/Topics";
import Activity from "../components/Activity";

function ProfilePage() {

    const { id } = useParams();

    const { user: loggedInUser } = useAuth();

    const [profileData, setProfileData] = useState(null);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const response = await api.get(
                    `/users/${id}/`
                );

                setProfileData(response.data);

            } catch (error) {

                console.log(
                    "Profile error:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        fetchProfile();

    }, [id]);


    if (loading) {
        return <h2>Loading profile...</h2>;
    }


    if (!profileData) {
        return <h2>Profile not found.</h2>;
    }


    const profileUser = profileData.user;


    return (

        <main className="profile-page layout layout--3">

            <div className="container">


                {/* Topics */}

                <Topics
                    topics={[]}
                />


                {/* Profile + Rooms */}

                <div className="roomList">


                    <div className="profile">


                        <div className="profile__avatar">

                            <div className="avatar avatar--large active">

                                <img
                                    src="https://randomuser.me/api/portraits/men/11.jpg"
                                    alt={profileUser.username}
                                />

                            </div>

                        </div>


                        <div className="profile__info">

                            <h3>
                                {profileUser.username}
                            </h3>

                            <p>
                                @{profileUser.username}
                            </p>


                            {loggedInUser &&
                                loggedInUser.id === profileUser.id && (

                                <Link
                                    to="/update-user"
                                    className="btn btn--main btn--pill"
                                >
                                    Edit Profile
                                </Link>

                            )}

                        </div>


                        <div className="profile__about">

                            <h3>
                                About
                            </h3>

                            <p>
                                Welcome to StudyBud!
                            </p>

                        </div>


                    </div>


                    <div className="roomList__header">

                        <div>

                            <h2>
                                Study Rooms Hosted by{" "}
                                {profileUser.username}
                            </h2>

                        </div>

                    </div>


                    <RoomList
                        rooms={profileData.rooms || []}
                    />


                </div>


                {/* Activity */}

                <Activity
                    messages={profileData.messages || []}
                />


            </div>

        </main>

    );
}

export default ProfilePage;