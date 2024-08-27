import AdminDashboard from "../../components/dashboard/AdminDashboard";
import UserDashboard from "../../components/dashboard/UserDashboard";
import { ROLES } from "../../constants/shares";
import { useAuthContext } from "../../context/AuthContext";

const DashboardPage = () => {
  const { user } = useAuthContext();

  return (
    <div>
      {user?.role === ROLES.ADMIN && <AdminDashboard />}
      {user?.role === ROLES.USER && <UserDashboard />}
    </div>
  );
};
export default DashboardPage;
