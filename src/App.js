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
import { SidebarProvider } from "./SidebarContext";
import Category_Maintenance from "./Component/File/Category_Maintenance/Category_Maintenance";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./Component/i18n.js";
// import Get_User from "./Component/Utilities/User_Management/Get_User";
import Account_Code_Maintenance from "./Component/File/Account_Code_Maintenance/Account_Code_Maintenance";
import Item_Maintenance from "./Component/File/Item_Maintenance/Item_Maintenance";
import Company_Maintenance from "../src/Component/File/Company_Maintenance/Company_Maintenance";
import Capacity_Maintenance from "./Component/File/Capacity_Maintenance/Capacity_Maintenance";
import Type_Maintenance from "./Component/File/Type_Maintenance/Type_Maintenance";
import Item_Sale from "./Component/Transaction/Item_Sale/Item_Sale";
import Item_Purchase from "./Component/Transaction/Item_Purchase/Item_Purchase";
import CryptoJS from "crypto-js"; // Import crypto-js
import UserMaintenance from "./Component/Utilities/UserManagement/UserManagement1.jsx";
import MenuUser from "./Component/Utilities/UserManagement/MenuUser/MenuUser.jsx";
import EditUser from "./Component/Utilities/UserManagement/Edit_User/Edit_User.jsx";
import AddUser1 from "./Component/Utilities/UserManagement/Add_User1/AddUser1.jsx";

const secretKey = "your-secret-key-roomiBaba-@123786"; // Secret key for encryption

// Encrypt function for the paths
const encryptPath = (path) => {
  return encodeURIComponent(CryptoJS.AES.encrypt(path, secretKey).toString());
};

// Decrypt function for the paths
const decryptPath = (encryptedPath) => {
  try {
    return CryptoJS.AES.decrypt(
      decodeURIComponent(encryptedPath),
      secretKey
    ).toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return null;
  }
};

// Dynamic Route Handler
function DynamicRouteHandler() {
  const { encryptedPath } = useParams(); // Use useParams to get encrypted path
  const decryptedPath = decryptPath(encryptedPath); // Decrypt the path

  const pathToComponentMap = {
    "/": <Loginn />,
    "/MainPage": <HomePage1 />,
    "/AccountCodeMaintenance": <Account_Code_Maintenance />,
    "/ItemMaintenance": <Item_Maintenance />,
    "/CompanyMaintenance": <Company_Maintenance />,
    "/CategoryMaintenance": <Category_Maintenance />,
    "/CapacityMaintenance": <Capacity_Maintenance />,
    "/TypeMaintenance": <Type_Maintenance />,
    "/ItemSale": <Item_Sale />,
    "/ItemPurchase": <Item_Purchase />,
    // "/UserManagement": <Get_User />,
  };

  if (decryptedPath && pathToComponentMap[decryptedPath]) {
    return pathToComponentMap[decryptedPath];
  }

  return <Navigate to="/" replace />;
}

function App() {
  const queryClient = new QueryClient();

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      {/* <Router basename="/makkah_cooling_center">
        <SidebarProvider>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <Routes>
                <Route exact path="/" element={<Loginn />} />
                <Route exact path="/login" element={<Loginn />} />
                <Route
                  exact
                  path="/dynamic/:encryptedPath"
                  element={<DynamicRouteHandler />}
                />
              </Routes>
            </QueryClientProvider>
          </ThemeProvider>
        </SidebarProvider>
      </Router> */}

      <Router basename="/alphahardware">
        <SidebarProvider>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <Routes>
                <Route exact path="/" element={<Loginn />} />
                <Route exact path="/login" element={<Loginn />}></Route>
                <Route exact path="/MainPage" element={<HomePage1 />}></Route>
                {/* ///////////////////////////////// file  /////////////////////////////// */}

                <Route
                  exact
                  path="/AccountCodeMaintenance"
                  element={<Account_Code_Maintenance />}
                ></Route>
                <Route
                  exact
                  path="/ItemMaintenance"
                  element={<Item_Maintenance />}
                ></Route>
                <Route
                  exact
                  path="/CompanyMaintenance"
                  element={<Company_Maintenance />}
                ></Route>
                <Route
                  exact
                  path="/TypeMaintenance"
                  element={<Type_Maintenance />}
                ></Route>
                <Route
                  exact
                  path="/CategoryMaintenance"
                  element={<Category_Maintenance />}
                ></Route>
                <Route
                  exact
                  path="/CapacityMaintenance"
                  element={<Capacity_Maintenance />}
                ></Route>
                <Route exact path="/ItemSale" element={<Item_Sale />}></Route>
                <Route
                  exact
                  path="/ItemPurchase"
                  element={<Item_Purchase />}
                ></Route>
                <Route
                  exact
                  path="/UserManagement"
                  element={<UserMaintenance />}
                ></Route>
                <Route
                  exact
                  path="/MenuUser/:id"
                  element={<MenuUser />}
                ></Route>
                <Route exact path="/EditUser" element={<EditUser />}></Route>
                <Route exact path="/AddUser1" element={<AddUser1 />}></Route>
              </Routes>
            </QueryClientProvider>
          </ThemeProvider>
        </SidebarProvider>
      </Router>
    </div>
  );
}

export default App;
