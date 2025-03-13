import { FaUserFriends, FaUniversity, FaFacebookMessenger, FaAddressBook, FaUserEdit } from "react-icons/fa";

export const SidebarData=[
    {
      icon:<FaUserFriends/>,
        title: "Sample",
        path: "/*",
      },
      {
        icon:<FaAddressBook/>,
        title: "Appointments",
        path: "/appointments",
      },
      {
        icon:<FaUniversity/>,
        title: "Update Your Details",
        path: "/doctorprofile",
      },
      {
        icon:<FaFacebookMessenger/>,
        title: "Chat",
        path: "/chat",
      },
      {
        icon:<FaUserEdit/>,
        title: "Edit Profile",
        path: "/updateDoctor",
       
      },
]