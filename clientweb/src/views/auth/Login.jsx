import { useState } from "react";

import Logo from "../../assets/logo.jpg";
import Wallpapers from "../../assets/wp.jpg";

import {
    Card,
    CardBody,
    CardFooter,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
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
                        <Input
                            label="Email"
                            size="lg"
                            id="email"
                            htmlFor="email"
                            autoComplete="on"
                            color="blue"
                        />
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                size="lg"
                                id="password"
                                htmlFor="password"
                                color="blue"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                                onClick={handleClickShowPassword}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                        <div className="-ml-2.5 font-JakartaSans">
                            <Checkbox label="Remember Me" />
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button
                            variant="gradient"
                            fullWidth
                            className="font-JakartaSans"
                            color="blue"
                        >
                            Sign In
                        </Button>
                    </CardFooter>
                </Card>
            </main>
        </>
    );
};

export default Login;
