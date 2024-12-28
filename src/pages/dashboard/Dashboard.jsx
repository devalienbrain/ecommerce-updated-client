import { Outlet } from "react-router-dom";
import DashboardSidebar from "../../components/dashboards/DashboardSidebar";
// import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  return (
    <>
      {/* <Helmet>
        <title>Share Manager | Dashboard</title>
      </Helmet> */}
      <div className="font-popppins w-full lg:w-3/4 mx-auto">
        <div className="block lg:flex">
          <div className="min-w-64 shadow-md ">
            <DashboardSidebar />
          </div>
          <div className="w-3/4 min-h-screen p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
