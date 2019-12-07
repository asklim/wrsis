// @material-ui/icons
import { 
  AddBox,
  Dashboard,
  Unarchive,
  Fingerprint 
} from '@material-ui/icons';

// core components/views for Admin layout
import MainDashboardPage from "../views/MainDashboard.js";
import UpgradeToPro from "../views/m-d-r/UpgradeToPro.js";

import ProcurementBoardPage from "../views/ProcurementBoard.js";
import DialogList from "../views/DialogList.js";

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
    path: "/procurement",
    name: "Procurement",
    rtlName: "rtl_procurement",
    icon: AddBox,
    component: ProcurementBoardPage,
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
    path: "/uis-dash",
    name: "CREATIVE TIM",
    rtlName: "التطور للاحترافية",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/uisamples"
  },
];

export default adminRoutes;
