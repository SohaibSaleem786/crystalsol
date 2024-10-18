import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useParams,
} from "react-router-dom";
import HomePage1 from "./Component/MainComponent/HomePage/Homepage";
import { ThemeProvider } from "./ThemeContext";
import Loginn from "./Component/MainComponent/Loginn/Login";
import Category_Maintenance from "./Component/File/Category_Maintenance/Category_Maintenance";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./Component/i18n.js";
import Account_Code_Maintenance from "./Component/File/Account_Code_Maintenance/Account_Code_Maintenance";
import Item_Maintenance from "./Component/File/Item_Maintenance/Item_Maintenance";
import Company_Maintenance from "../src/Component/File/Company_Maintenance/Company_Maintenance";
import Capacity_Maintenance from "./Component/File/Capacity_Maintenance/Capacity_Maintenance";
import Type_Maintenance from "./Component/File/Type_Maintenance/Type_Maintenance";
import UserMaintenance from "./Component/Utilities/UserManagement/UserManagement1.jsx";
import MenuUser from "./Component/Utilities/UserManagement/MenuUser/MenuUser.jsx";
import Layout from "./Component/MainComponent/Layout/Layout.js";
import AddUser1 from "./Component/Utilities/UserManagement/AddUser/AddUser.jsx";
import MenuAdmin from "./Component/MainComponent/Header/Admin/MenuAdmin/MenuAdmin.jsx";
import MessageScreen from "./Component/MainComponent/Header/Message/MessageScreen.jsx";
// import AdminMenuUser from "./Component/MainComponent/Header/Admin/AdminUserManagement/AdminMenuUser/AdminMenuUser.jsx";
// import AdminAddUser from "./Component/MainComponent/Header/Admin/AdminUserManagement/AdminAddUser/AdminAddUser.jsx";
import AdminCustomers from "./Component/MainComponent/Header/Admin/AdminCustomer/AdminCustomers.jsx";
import AdminUserManagement from "./Component/MainComponent/Header/Admin/AdminCustomer/AdminUserManagement/AdminUserManagement.jsx";
import AdminAddUser from "./Component/MainComponent/Header/Admin/AdminCustomer/AdminUserManagement/AdminAddUser/AdminAddUser.jsx";
import AdminMenuUser from "./Component/MainComponent/Header/Admin/AdminCustomer/AdminUserManagement/AdminMenuUser/AdminMenuUser.jsx";
import AdminCustomerMenu from "./Component/MainComponent/Header/Admin/AdminCustomer/AdminCustomerMenu/AdminCustomerMenu/AdminCustomerMenu.jsx";
import Customer from "./Component/MainComponent/Header/Admin/AdminCustomer/SaveCustomer.jsx";

function App() {
  const queryClient = new QueryClient();

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Router basename="/crystalsol">
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route exact path="/" element={<Loginn />} />
              <Route exact path="/login" element={<Loginn />} />
              <Route element={<Layout />}>
                {/* All pages with the sidebar */}
                <Route exact path="/MainPage" element={<HomePage1 />} />
                <Route
                  exact
                  path="/AccountCodeMaintenance"
                  element={<Account_Code_Maintenance />}
                />
                <Route
                  exact
                  path="/ItemMaintenance"
                  element={<Item_Maintenance />}
                />
                <Route
                  exact
                  path="/MessageScreen"
                  element={<MessageScreen />}
                />

                <Route
                  exact
                  path="/CompanyMaintenance"
                  element={<Company_Maintenance />}
                />
                <Route
                  exact
                  path="/TypeMaintenance"
                  element={<Type_Maintenance />}
                />
                <Route
                  exact
                  path="/CategoryMaintenance"
                  element={<Category_Maintenance />}
                />
                <Route
                  exact
                  path="/CapacityMaintenance"
                  element={<Capacity_Maintenance />}
                />

                <Route
                  exact
                  path="/UserManagement"
                  element={<UserMaintenance />}
                />
                <Route exact path="/MenuUser/:tusrid" element={<MenuUser />} />
                <Route exact path="/AddUser1" element={<AddUser1 />} />

                <Route
                  exact
                  path="/AdminUserManagement/:code"
                  element={<AdminUserManagement />}
                />
                <Route
                  exact
                  path="/AdminMenuUser/:tusrid/:code"
                  element={<AdminMenuUser />}
                />
                <Route
                  exact
                  path="/AdminAddUser/:code"
                  element={<AdminAddUser />}
                />
                <Route
                  exact
                  path="/AdminCustomerMenu/:code"
                  element={<AdminCustomerMenu />}
                />
                <Route
                  exact
                  path="/AdminCustomers"
                  element={<AdminCustomers />}
                />
                <Route exact path="/MenuAdmin" element={<MenuAdmin />} />
                <Route exact path="/Customers" element={<Customer />} />
              </Route>
            </Routes>
          </QueryClientProvider>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
