// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import AddBox from "@material-ui/icons/AddBoxOutlined";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import Fingerprint from '@material-ui/icons/Fingerprint';

// core components/views for Admin layout
import DashboardPage from "./views/Dashboard/Dashboard.jsx";
import InvoiceBoardPage from "./views/InvoiceBoard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import DialogList from "./views/DialogList/DialogList.jsx";
import TableList from "./views/TableList/TableList.jsx";
import Typography from "./views/Typography/Typography.jsx";
import Icons from "./views/Icons/Icons.jsx";
import Maps from "./views/Maps/Maps.jsx";
import NotificationsPage from "./views/Notifications/Notifications.jsx";
import UpgradeToPro from "./views/UpgradeToPro/UpgradeToPro.jsx";

// core components/views for RTL layout
import RTLPage from "./views/RTLPage/RTLPage.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Invoices",
    rtlName: "rtl_invoices",
    icon: AddBox,
    component: InvoiceBoardPage,
    layout: "/invoice"
  },  
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/dialogs",
    name: "Dialog List",
    rtlName: "قائمة الجدول",
    icon: Fingerprint,
    component: DialogList,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/upgrade-to-pro",
    name: "Upgrade To PRO",
    rtlName: "التطور للاحترافية",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/admin"
  },
  {
    path: "/rtl-page",
    name: "RTL Support",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: RTLPage,
    layout: "/rtl"
  }
];

export default dashboardRoutes;
