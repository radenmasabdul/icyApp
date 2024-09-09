import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Card,
    CardBody,
    CardFooter,
    Input,
    Button,
} from "@material-tailwind/react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { loginValidationSchema } from "../../utils/validationSchema";
import { Formik, Field, Form, ErrorMessage } from "formik";

import Cookies from "js-cookie";
import Swal from "sweetalert2";

import Api from "../../utils/apiRequest";
import Logo from "../../assets/logo.jpg";
import Wallpapers from "../../assets/wp.jpg";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (values) => {
        try {
            const res = await Api.post("/login", {
                email: values.email,
                password: values.password,
            });

            Cookies.set("token", res.data.token, { expires: 0.5 });
            Cookies.set("user", JSON.stringify(res.data.user), {
                expires: 0.5,
            });
            Cookies.set("role", res.data.user.role, { expires: 0.5 });

            if (Cookies.get("token")) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Berhasil Masuk!",
                    html: "Redirecting in <b></b> seconds.",
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        let countDown = 2;
                        timer.textContent = countDown.toString();
                        const timerInterval = setInterval(() => {
                            countDown--;
                            timer.textContent = countDown.toString();
                            if (countDown <= 0) {
                                clearInterval(timerInterval);
                            }
                        }, 1000);
                    },
                    willClose: () => {
                        navigate("/home");
                    },
                });
            }
        } catch (error) {
            console.error(error);
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Login Failed!",
                    text: error.response.data.message,
                });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Login Failed!",
                    text: "Something went wrong. Please try again.",
                });
            }
        }
    };

    return (
        <>
            <main
                className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8"
                style={{
                    backgroundImage: `url(${Wallpapers})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={loginValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form>
                            <Card className="sm:mx-auto sm:w-full sm:max-w-md">
                                <div className="py-2">
                                    <img
                                        className="mx-auto h-20 w-auto rounded-full"
                                        src={Logo}
                                        alt="logo"
                                    />
                                    <p className="py-2 font-DancingSans text-center text-4xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                                        Icy Company
                                    </p>
                                </div>
                                <CardBody className="flex flex-col gap-4 font-JakartaSans">
                                    <div>
                                        <Field
                                            as={Input}
                                            label="Email"
                                            size="lg"
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="on"
                                            color="blue"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="text-red-500 font-JakartaSans text-sm"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Field
                                            as={Input}
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            label="Password"
                                            size="lg"
                                            id="password"
                                            name="password"
                                            color="blue"
                                            className=""
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-red-500 font-JakartaSans text-sm"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                                            onClick={handleClickShowPassword}
                                        >
                                            {showPassword ? (
                                                <FaEye />
                                            ) : (
                                                <FaEyeSlash />
                                            )}
                                        </button>
                                    </div>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button
                                        variant="gradient"
                                        fullWidth
                                        className="font-JakartaSans"
                                        color="blue"
                                        type="submit"
                                    >
                                        Sign In
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Form>
                    )}
                </Formik>
            </main>
        </>
    );
};

export default Login;
