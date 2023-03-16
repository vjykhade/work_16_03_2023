import "./sidebar.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StoreIcon from '@mui/icons-material/Store';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { Link }  from "react-router-dom"
import { DarkModeContext } from "../../../context/darkModeContext";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";

function Sidebar() {

  const {dispatch} = useContext(AuthContext);
  //const {dispatch} = useContext();

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{textDecoration: "none"}}>
        <span className="logo">vkartadmin</span>
        </Link>
      </div>
      <hr/>
      <div className="center">
        <ul>
            <p className="title">Main</p>
            <Link to="/" style={{textDecoration: "none"}}>
            <li><DashboardIcon className="icon"/><span>Dashboard</span></li></Link>
            <p className="title">Lists</p>
            <Link to="/users" style={{textDecoration: "none"}}>
            <li><PersonOutlineOutlinedIcon className="icon"/><span>Users</span></li></Link>
            <Link to="/products" style={{textDecoration: "none"}}>
            <li><StoreIcon className="icon"/><span>Products</span></li></Link>
            <li><CreditCardIcon className="icon"/><span>Orders</span></li>
            <li><LocalShippingIcon className="icon"/><span>Delivery</span></li>
            <p className="title">Useful</p>
            <li><AnalyticsIcon className="icon"/><span>Stats</span></li>
            <li><NotificationsIcon className="icon"/><span>Notifications</span></li>
            <p className="title">Service</p>
            <li><SettingsSystemDaydreamIcon className="icon"/><span>System Health</span></li>
            <li><PsychologyIcon className="icon"/><span>Logs</span></li>
            <li><SettingsApplicationsIcon className="icon"/><span>Settings</span></li>
            <p className="title">User</p>
            <li><AccountCircleRoundedIcon className="icon"/><span>Profile</span></li>
            <li><ExitToAppRoundedIcon className="icon"/><span onClick={()=> dispatch({type:"LOGOUT"})}>Logout</span></li>
        </ul>
      </div>
      <div className="bottom">
        {/* <div className="colorOption" onClick={()=> dispatch({type:"LIGHT"})}></div>
        <div className="colorOption" onClick={()=> dispatch({type:"DARK"})}></div> */}
      </div>
    </div>
  )
}

export default Sidebar
