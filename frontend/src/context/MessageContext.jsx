import {
    createContext,
    useContext,
    useState
} from "react";


const MessageContext = createContext();


export function MessageProvider({ children }) {

    const [message, setMessage] = useState(null);


    const showMessage = (text, type = "success") => {

        setMessage({
            text,
            type
        });


        setTimeout(() => {

            setMessage(null);

        }, 3000);

    };


    return (

        <MessageContext.Provider
            value={{
                message,
                showMessage
            }}
        >

            {children}

        </MessageContext.Provider>

    );

}


export function useMessage() {

    return useContext(MessageContext);

}