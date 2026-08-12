import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";


function RoomForm() {


    const navigate = useNavigate();


    const [topics, setTopics] = useState([]);

    const [formData, setFormData] = useState({

        topic: "",
        name: "",
        description: ""

    });



    



    const getTopics = async()=>{

        try{

            const response = await api.get("/home/");

            setTopics(response.data.topics);


        }catch(error){

            console.log(error);

        }

    };


    useEffect(()=>{

        getTopics();

    },[]);

    const handleChange = (e)=>{

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };



    const handleSubmit = async(e)=>{

        e.preventDefault();


        try{


            await api.post("/rooms/create/",{


                name: formData.name,

                description: formData.description,

                topic: formData.topic


            });


            navigate("/");


        }catch(error){

            console.log("Create room error:",error);

        }


    };



    return (

        <div className="layout__box">


            <div className="layout__boxHeader">


                <div className="layout__boxTitle">


                    <Link to="/">

                        ←

                    </Link>


                    <h3>
                        Create Study Room
                    </h3>


                </div>


            </div>



            <div className="layout__body">


                <form 
                    className="form"
                    onSubmit={handleSubmit}
                >



                    <div className="form__group">


                        <label>
                            Enter a Topic
                        </label>


                        <input

                            required

                            type="text"

                            name="topic"

                            list="topic-list"

                            value={formData.topic}

                            onChange={handleChange}

                        />


                        <datalist id="topic-list">


                            {topics.map(topic=>(

                                <option 
                                    key={topic.id}
                                    value={topic.id}
                                >
                                    {topic.name}
                                </option>

                            ))}


                        </datalist>


                    </div>




                    <div className="form__group">


                        <label>
                            Room Name
                        </label>


                        <input

                            required

                            type="text"

                            name="name"

                            value={formData.name}

                            onChange={handleChange}

                        />


                    </div>




                    <div className="form__group">


                        <label>
                            Description
                        </label>


                        <textarea

                            name="description"

                            value={formData.description}

                            onChange={handleChange}

                        />


                    </div>



                    <div className="form__action">


                        <Link 
                            className="btn btn--dark"
                            to="/"
                        >

                            Cancel

                        </Link>



                        <button 
                            className="btn btn--main"
                            type="submit"
                        >

                            Submit

                        </button>


                    </div>


                </form>


            </div>


        </div>

    );

}


export default RoomForm;