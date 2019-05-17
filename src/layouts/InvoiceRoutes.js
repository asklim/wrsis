// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import AddBox from "@material-ui/icons/AddBoxOutlined";
import Fingerprint from '@material-ui/icons/Fingerprint';


// core components/views for Invoice layout
import DashboardPage from "../views/Dashboard/Dashboard.jsx";
import DialogList from "../views/DialogList/DialogList.jsx";
import InvoiceBoardPage from "../views/InvoiceBoard.jsx";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "rtl_admin",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Invoice",
    rtlName: "rtl_invoice",
    icon: AddBox,
    component: InvoiceBoardPage,
    layout: "/invoice"
  },
  {
    path: "/dialogs",
    name: "Dialog List",
    rtlName: "rtl_dialogs",
    icon: Fingerprint,
    component: DialogList,
    layout: "/invoice"
  },
];

export default dashboardRoutes;
