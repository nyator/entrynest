import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";

const AdminNavbar = () => {
  return (
    <>
      <div className="flex items-center justify-between pb-4 border-b-[1px] border-gray">
        <Link to="/admin-dashboard">
          <img src="/logo.svg" alt="logo" />
        </Link>
        <h1>Admin Dashboard</h1>
        <UserAvatar />
      </div>
    </>
  );
};

export default AdminNavbar;


