import { useState } from "react";

import {
    Card,
    List,
    ListItem,
    ListItemPrefix,
    IconButton,
} from "@material-tailwind/react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { SiBookstack } from "react-icons/si";

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            {/* Button for mobile */}
            <div className="md:hidden p-4">
                <IconButton
                    onClick={toggleSidebar}
                    variant="text"
                    color="blue-gray"
                >
                    {isSidebarOpen ? (
                        <XMarkIcon className="h-6 w-6" />
                    ) : (
                        <Bars3Icon className="h-6 w-6" />
                    )}
                </IconButton>
            </div>

            {/* Sidebar */}
            <Card
                className={`h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none bg-white fixed z-50 transition-transform transform md:translate-x-0 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } md:relative`}
            >
                <List>
                    <ListItem>
                        <ListItemPrefix>
                            <MdSpaceDashboard className="h-7 w-7 text-black" />
                        </ListItemPrefix>
                        <span className="font-JakartaSans text-black font-medium">
                            Dashboard
                        </span>
                    </ListItem>

                    <ListItem>
                        <ListItemPrefix>
                            <FaUserCircle className="h-7 w-7 text-black" />
                        </ListItemPrefix>
                        <span className="font-JakartaSans text-black font-medium">
                            Users
                        </span>
                    </ListItem>

                    <ListItem>
                        <ListItemPrefix>
                            <PiStudentFill className="h-7 w-7 text-black" />
                        </ListItemPrefix>
                        <span className="font-JakartaSans text-black font-medium">
                            Students
                        </span>
                    </ListItem>

                    <ListItem>
                        <ListItemPrefix>
                            <SiBookstack className="h-7 w-7 text-black" />
                        </ListItemPrefix>
                        <span className="font-JakartaSans text-black font-medium">
                            Courses
                        </span>
                    </ListItem>
                </List>
            </Card>
        </div>
    );
};

export default Sidebar;
