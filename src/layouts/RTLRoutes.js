// @material-ui/icons
import {
    ArrowBack,
    Dashboard,
    Person,
    LibraryBooks,
    BubbleChart,
    //LocationOn,
    Notifications,
    //Unarchive,
    //Language,
} from "@material-ui/icons";


// core components/views for RTL layout
import DashboardPage from "../views/m-d-r/Dashboard.js";
import UserProfile from "../views/m-d-r/UserProfile.js";
import TableList from "../views/m-d-r/TableList.js";
import Typography from "../views/m-d-r/Typography.js";
import Icons from "../views/m-d-r/Icons.js";
import NotificationsPage from "../views/m-d-r/Notifications.js";

import UISamples from "./UISamples.js";

const rtlRoutes = [
    {
        path: "",
        name: "Back to UI-Samples",
        rtlName: "rtl_BacktoMain",
        icon: ArrowBack,
        component: UISamples,
        layout: "/uisamples"
    },
    {
        path: "/rtl-page",
        name: "Dashboard",
        rtlName: "لوحة القيادة",
        icon: Dashboard,
        component: DashboardPage,
        layout: "/rtl"
    },
    {
        path: "/user",
        name: "User Profile",
        rtlName: "ملف تعريفي للمستخدم",
        icon: Person,
        component: UserProfile,
        layout: "/rtl"
    },
    {
        path: "/table",
        name: "Table List",
        rtlName: "قائمة الجدول",
        icon: "content_paste",
        component: TableList,
        layout: "/rtl"
    },
    {
        path: "/typography",
        name: "Typography",
        rtlName: "طباعة",
        icon: LibraryBooks,
        component: Typography,
        layout: "/rtl"
    },
    {
        path: "/icons",
        name: "Icons",
        rtlName: "الرموز",
        icon: BubbleChart,
        component: Icons,
        layout: "/rtl"
    },
    {
        path: "/notifications",
        name: "Notifications",
        rtlName: "إخطارات",
        icon: Notifications,
        component: NotificationsPage,
        layout: "/rtl"
    },
];

export default rtlRoutes;
