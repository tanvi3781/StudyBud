import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/axios";

import { useMessage } from "../context/MessageContext";


function Register() {

    const navigate = useNavigate();

    const { showMessage } = useMessage();


    const [formData, setFormData] = useState({

        username: "",

        email: "",

        password: "",

        password2: ""

    });


    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        if (
            formData.password !==
            formData.password2
        ) {

            showMessage(
                "Passwords do not match.",
                "error"
            );

            return;

        }


        setLoading(true);


        try {

            await api.post(
                "/register/",
                {
                    username: formData.username,

                    email: formData.email,

                    password: formData.password
                }
            );


            showMessage(
                "Registration successful! Please login.",
                "success"
            );


            navigate("/login");


        } catch (error) {

            console.log(error);


            const message =
                error.response?.data?.error ||
                "Registration failed.";


            showMessage(
                message,
                "error"
            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <main className="auth layout">

            <div className="container">

                <div className="layout__box">

                    <div className="layout__boxHeader">

                        <div className="layout__boxTitle">

                            <h3>Register</h3>

                        </div>

                    </div>


                    <div className="layout__body">

                        <h2 className="auth__tagline">
                            Find your study partner
                        </h2>


                        <form
                            className="form"
                            onSubmit={handleSubmit}
                        >

                            <div className="form__group">

                                <label>
                                    Username
                                </label>

                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="form__group">

                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="form__group">

                                <label>
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="form__group">

                                <label>
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    name="password2"
                                    value={formData.password2}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <button
                                className="btn btn--main"
                                type="submit"
                                disabled={loading}
                            >

                                {loading
                                    ? "Registering..."
                                    : "Register"
                                }

                            </button>

                        </form>


                        <div className="auth__action">

                            <p>
                                Already signed up?
                            </p>

                            <Link
                                to="/login"
                                className="btn btn--link"
                            >
                                Sign In
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </main>

    );

}


export default Register;