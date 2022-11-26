import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Header from "../Pages/Header/Header";

const DashBoardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin, adminLoading] = useAdmin(user?.email);
  console.log(isAdmin);
  if (adminLoading) {
    return (
      <div className="text-center m-56">
        <button className="btn btn-square loading"></button>
      </div>
    );
  }

  return (
    <div>
      <Header></Header>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li>
              <Link to="/dashBoard">My Orders</Link>
            </li>
            {isAdmin && (
              <div>
                <li>
                  <Link to="/dashBoard/allUser/Buyer">All Buyer</Link>
                </li>
                <li>
                  <Link to="/dashBoard/allUser/Seller">All Seller</Link>
                </li>
              </div>
            )}

            <li>
              <Link to="/dashBoard/addProduct">Add A Product</Link>
            </li>
            <li>
              <Link to="/dashBoard/myProduct">My Product</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;