import { FaUserFriends, FaSearch, FaUserPlus, FaAddressBook, FaUserEdit } from "react-icons/fa";

export const SidebarData=[
    {
      icon:<FaUserFriends/>,
        title: "Our Users",
        path: "/*",
      },
      {
        icon:<FaAddressBook/>,
        title: "All Appointments",
        path: "/allapp",
      },
      {
        icon:<FaSearch/>,
        title: "Search Users",
        path: "/searchall",
      },
      {
        icon:<FaUserPlus/>,
        title: "Add Doctor/Patient",
        path: "/adddoc",
      },
      {
        icon:<FaUserEdit/>,
        title: "Edit Profile",
        path: "/updateStaff",
       
      },
]