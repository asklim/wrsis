// @material-ui/icons
import { 
    AddBox,
    Dashboard,
    Unarchive,
    Fingerprint,
    MoodBad,
    PhoneInTalk,
} from '@material-ui/icons';

//views for Admin layout
import MainDashboardPage from "../views/MainDashboard.js";
import DialogList from "../views/DialogList.js";
import ViberInfo from "../views/ViberInfo.js";

import InvoiceBoard from './Invoice.js';
import UISamples from "./UISamples.js";


const adminRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        rtlName: "لوحة القيادة",
        icon: Dashboard,
        component: MainDashboardPage,
        layout: "/admin"
    },
    {
        path: "",
        name: "Invoice Board",
        rtlName: "rtl_InvoiceBoard",
        icon: AddBox,
        component: InvoiceBoard,
        layout: "/invoice"
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
        path: "/viberinfo",
        name: "Viber Info",
        rtlName: "قائمة الجدول",
        icon: PhoneInTalk,
        component: ViberInfo,
        layout: "/admin"
    },
    {
        path: "/bad-link",
        name: "Bad Link",
        rtlName: "قائمة الجدول",
        icon: MoodBad,
        component: DialogList,
        layout: "/inv"
    },
    {
        path: "", //Use & check in <Sidebar />
        name: "CREATIVE TIM",
        rtlName: "التطور للاحترافية",
        icon: Unarchive,
        component: UISamples,
        layout: "/uisamples"
    },
];

export default adminRoutes;
