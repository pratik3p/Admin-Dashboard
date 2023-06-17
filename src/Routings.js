import Advertisement from "./pages/Advertisement";
import Category from "./pages/Category";
import Course from "./pages/Course";

const Routings=[
    {
        path:'/dash/course',
        name:'Course',
        element:<Course/>
    },
    {
        path:'/dash/advertisement',
        name:'',
        element:<Advertisement/>
    },
    {
        path:'/dash/category',
        name:'',
        element:<Category/>
    },
];

export default Routings;