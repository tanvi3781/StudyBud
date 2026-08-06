function Participants({ participants }) {


    return (

        <div className="participants">


            <h3 className="participants__top">

                Participants 
                <span>
                    {participants.length}
                </span>

            </h3>



            <div className="participants__list scroll">


                {participants.map((user)=>(


                    <div 
                      className="participant"
                      key={user.id}
                    >


                        <div className="avatar avatar--medium">

                            <img 
                              src="https://randomuser.me/api/portraits/men/37.jpg"
                              alt=""
                            />

                        </div>



                        <p>

                            {user.username}

                            <span>
                                @{user.username}
                            </span>


                        </p>


                    </div>


                ))}


            </div>


        </div>

    );

}


export default Participants;