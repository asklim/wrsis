// @material-ui/icons
import {
  AddBoxOutlined,
  ArrowBack,
} from "@material-ui/icons";

// core components/views for Invoice layout
import DashboardPage from "../views/m-d-r/Dashboard.js";
import ProcurementBoardPage from "../views/ProcurementBoard.js";



const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Back to Dash",
    rtlName: "rtl_Back",
    icon: ArrowBack,     //Dashboard,
    component: DashboardPage,
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
];

export default dashboardRoutes;
