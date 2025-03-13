import { FaUserFriends, FaSearch, FaUserPlus, FaUserMinus, FaUserEdit } from "react-icons/fa";

export const SidebarData=[
    {
        icon:<FaUserFriends/>,
        title: "Our Users",
        path: "/*",
      },
      {
        icon:<FaSearch/>,
        title: "Search Users",
        path: "/searchuser",
      },
      {
        icon:<FaUserPlus/>,
        title: "Add Users",
        path: "/adduser",
      },
      {
        icon:<FaUserMinus/>,
        title: "Delete Users",
        path: "/deleteuser",
        
      },
      {
        icon:<FaUserEdit/>,
        title: "Edit Profile",
        path: "/updateAdmin",
       
      },
]