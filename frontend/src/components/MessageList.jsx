function MessageList({ messages }) {

    return (

        <div className="room__conversation">

            <div className="threads scroll">

                {messages.length === 0 && (
                    <p>No messages yet</p>
                )}


                {messages.map((message)=>(

                    <div className="thread" key={message.id}>


                        <div className="thread__top">

                            <div className="thread__author">


                                <span>
                                    @{message.user.username}
                                </span>


                                <span className="thread__date">

                                    {new Date(
                                        message.created
                                    ).toLocaleDateString()}

                                </span>


                            </div>

                        </div>


                        <div className="thread__details">

                            {message.body}

                        </div>


                    </div>

                ))}

            </div>

        </div>

    );
}

export default MessageList;