import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useMessage } from "../context/MessageContext";


function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const { showMessage } = useMessage();


    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);


        try {

            const response = await api.post(
                "/login/",
                {
                    username,
                    password
                }
            );


            login(response.data);


            showMessage(
                "Login successful!",
                "success"
            );


            navigate("/");


        } catch (error) {

            console.log(error);


            const message =
                error.response?.data?.error ||
                "Invalid username or password.";


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

                            <h3>Login</h3>

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
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="e.g. dennis_ivy"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            <div className="form__group">

                                <label>
                                    Password
                                </label>

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            <button
                                className="btn btn--main"
                                type="submit"
                                disabled={loading}
                            >

                                {loading
                                    ? "Logging in..."
                                    : "Login"
                                }

                            </button>


                        </form>


                        <div className="auth__action">

                            <p>
                                Haven't signed up yet?
                            </p>

                            <Link
                                to="/register"
                                className="btn btn--link"
                            >
                                Sign Up
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </main>

    );

}


export default Login;