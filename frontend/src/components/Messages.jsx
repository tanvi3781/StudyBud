import { useMessage } from "../context/MessageContext";


function Messages() {

    const { message } = useMessage();


    if (!message) {
        return null;
    }


    return (

        <div className="messages">

            <div
                className={`message ${
                    message.type === "error"
                        ? "message--error"
                        : "message--success"
                }`}
            >

                {message.text}

            </div>

        </div>

    );

}


export default Messages;