// @material-ui/icons
import {
    ArrowBack,
    Dashboard,
    Person,
    LibraryBooks,
    BubbleChart,
    //LocationOn,
    Notifications,
    Unarchive,
    Language,
} from "@material-ui/icons";


// core components/views for Admin layout
import DashboardPage from "../views/m-d-r/Dashboard.js";
import UserProfile from "../views/m-d-r/UserProfile.js";
import TableList from "../views/m-d-r/TableList.js";
import Typography from "../views/m-d-r/Typography.js";
import Icons from "../views/m-d-r/Icons.js";
//import Maps from "../views/m-d-r/Maps";
import NotificationsPage from "../views/m-d-r/Notifications.js";
import UpgradeToPro from "../views/m-d-r/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "../views/m-d-r/RTLPage.js";

import Admin from "./Admin.js";

const uisamplesRoutes = [
    {
        path: "",
        name: "Back to Main Dash",
        rtlName: "rtl_BacktoMain",
        icon: ArrowBack,
        component: Admin,
        layout: "/admin"
    },
    {
        path: "/uis-dash",
        name: "UIS Dashboard",
        rtlName: "لوحة القيادة",
        icon: Dashboard,
        component: DashboardPage,
        layout: "/uisamples"
    },
    {
        path: "/user",
        name: "User Profile",
        rtlName: "ملف تعريفي للمستخدم",
        icon: Person,
        component: UserProfile,
        layout: "/uisamples"
    },
    {
        path: "/table",
        name: "Table List",
        rtlName: "قائمة الجدول",
        icon: "content_paste",
        component: TableList,
        layout: "/uisamples"
    },
    {
        path: "/typography",
        name: "Typography",
        rtlName: "طباعة",
        icon: LibraryBooks,
        component: Typography,
        layout: "/uisamples"
    },
    {
        path: "/icons",
        name: "Icons",
        rtlName: "الرموز",
        icon: BubbleChart,
        component: Icons,
        layout: "/uisamples"
    },
    /*{
        path: "/maps",
        name: "Maps",
        rtlName: "خرائط",
        icon: LocationOn,
        component: Maps,
        layout: "/uisamples"
    },*/
    {
        path: "/notifications",
        name: "Notifications",
        rtlName: "إخطارات",
        icon: Notifications,
        component: NotificationsPage,
        layout: "/uisamples"
    },
    {
        path: "/upgrade-to-pro", //Use & check in <Sidebar />
        name: "Upgrade To PRO",
        rtlName: "التطور للاحترافية",
        icon: Unarchive,
        component: UpgradeToPro,
        layout: "/uisamples"
    },
    {
        path: "/rtl-page",
        name: "RTL Support",
        rtlName: "پشتیبانی از راست به چپ",
        icon: Language,
        component: RTLPage,
        layout: "/rtl"
    }, 
];

export default uisamplesRoutes;
