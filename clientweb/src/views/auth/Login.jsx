// import { useState } from "react";

// import Logo from "../../assets/logo.jpg";
import Wallpapers from "../../assets/wp.jpg";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";

// import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    // const [showPassword, setShowPassword] = useState(false);
    // const [checked, setChecked] = useState(false);

    // const handleClickShowPassword = () => {
    //     setShowPassword(!showPassword);
    // };

    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // };

    // const handleChange = (event) => {
    //     setChecked(event.target.checked);
    // };

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
                    <CardHeader
                        variant="gradient"
                        color="gray"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            Sign In
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Input
                            label="Email"
                            size="lg"
                            id="email"
                            htmlFor="email"
                            autoComplete="on"
                        />
                        <Input
                            label="Password"
                            size="lg"
                            id="password"
                            htmlFor="password"
                        />
                        <div className="-ml-2.5">
                            <Checkbox label="Remember Me" />
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" fullWidth>
                            Sign In
                        </Button>
                        <Typography
                            variant="small"
                            className="mt-6 flex justify-center"
                        >
                            Don&apos;t have an account?
                            <Typography
                                as="a"
                                href="#signup"
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold"
                            >
                                Sign up
                            </Typography>
                        </Typography>
                    </CardFooter>
                </Card>
            </main>
        </>
    );
};

export default Login;
