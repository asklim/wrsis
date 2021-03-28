// @material-ui/icons
import {
    AddBoxOutlined,
    ArrowBack,
    Fingerprint,
} from "@material-ui/icons";

// core components/views for Invoice layout
import Admin from "./Admin.js";
import ProcurementBoardPage from "../views/ProcurementBoard.js";
import DialogList from "../views/DialogList.js";


const dashboardRoutes = [
    {
        path: "",
        name: "Back to Dash",
        rtlName: "rtl_Back",
        icon: ArrowBack,     //Dashboard,
        component: Admin,
        layout: "/admin"
    },
    {
        path: "/procurement",
        name: "Procurement",
        rtlName: "rtl_procurement",
        icon: AddBoxOutlined,
        component: ProcurementBoardPage,
        layout: "/invoice"
    },  
    {
        path: "/dialogs",
        name: "Dialog List",
        rtlName: "قائمة الجدول",
        icon: Fingerprint,
        component: DialogList,
        layout: "/invoice"
    }, 
];

export default dashboardRoutes;
