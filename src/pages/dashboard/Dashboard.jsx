import { Outlet } from "react-router-dom";
import DashboardSidebar from "../../components/dashboards/DashboardSidebar";
import Navbar from "../../components/Navbar";
// import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  return (
    <>
      {/* <Helmet>
        <title>Share Manager | Dashboard</title>
      </Helmet> */}
      <div className="font-popppins max-w-7xl mx-auto">
        <div>
          <Navbar />
        </div>
        <div className="block lg:flex">
          <div className="min-w-64 shadow-md ">
            <DashboardSidebar />
          </div>
          <div className="flex-1 min-h-screen pl-5 pt-5 rounded-tl-btn shadow-md">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
