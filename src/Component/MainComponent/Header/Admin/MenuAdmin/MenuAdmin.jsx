// import React, { useState, useEffect } from "react";
// import { Button, Container, Nav } from "react-bootstrap";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// import Alert from "@mui/material/Alert";
// import { useTheme } from "../../../../../ThemeContext";
// import { isLoggedIn, getUserData, getOrganisationData } from "../../../../Auth";
// import NavComponent from "../../../Navform/navbarform";
// import "./MenuAdmin.css";
// import SingleButton from "../../../Button/SingleButton/SingleButton";
// import { fetchGetUser, fetchMenu } from "../../../../Redux/action";
// import { useSelector, useDispatch } from "react-redux";
// const MenuAdmin = () => {
//   // const { tusrid } = useParams();
//   const tusrid = "sohaib";
//   const user = getUserData();
//   const organisation = getOrganisationData();

//   const { apiLinks } = useTheme();
//   const [activeTab, setActiveTab] = useState(1);
//   const [getdata, setData] = useState({ columns: [], rows: [] });
//   const [showAlert, setShowAlert] = useState(false);
//   const [allPermissionsY, setAllPermissionsY] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [userType, setUserType] = useState("");
//   const [toggleState, setToggleState] = useState(true);
//   const navigate = useNavigate();
//   const [alertData, setAlertData] = useState(null);
//   const { data, loading, error } = useSelector((state) => state.getuser);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const userr = data.find((item) => item.tusrid === tusrid);
//     setUserName(userr && userr.tusrnam);
//     setUserType(userr && userr.Type);
//     dispatch(fetchGetUser(organisation.code));
//   }, [dispatch, organisation.code]);

//   useEffect(() => {
//     fetchDataForUserId(tusrid);
//   }, [activeTab]);

//   const {
//     isSidebarVisible,
//     toggleSidebar,
//     getcolor, // Background color from context
//     fontcolor, // Font color from context
//     toggleChangeColor,
//   } = useTheme();

//   // function fetchDataForUserId() {
//   //   console.log("call the api");
//   //   const apiUrl = `${apiLinks}/GetMenu.php`;
//   //   const data = { FUsrId: tusrid, code: organisation.code };
//   //   const formData = new URLSearchParams(data).toString();

//   //   return axios
//   //     .post(apiUrl, formData)
//   //     .then((response) => response.data)
//   //     .then((apiData) => {
//   //       const mainMenuItem = apiData.find(
//   //         (item) => item.tmencod === `${activeTab}-00-00`
//   //       );

//   //       if (!mainMenuItem) {
//   //         console.log("Main menu item not found for tab:", activeTab);
//   //         return;
//   //       }

//   //       const subItems = apiData.filter((subItem) => {
//   //         return subItem.tmencod.startsWith(`${activeTab}-`);
//   //       });

//   //       // Transform data for rendering
//   //       const transformedData = subItems.map((item) => ({
//   //         // Sr: `${item.tmencod.split("-")[1]}`,
//   //         Sr: item.tmencod,

//   //         Description: item.tmendsc,
//   //         Permissions: (
//   //           <select
//   //             style={{
//   //               height: "20px",
//   //               fontSize: "12px",
//   //               padding: "0px",
//   //               textAlign: "center",
//   //               color: fontcolor, // Apply dynamic font color
//   //               backgroundColor: getcolor, // Apply dynamic background color
//   //               border: "1px solid #ccc", // Optional: to make sure the border color is visible
//   //             }}
//   //             value={item.Permission}
//   //             onChange={(e) =>
//   //               handlePermissionChange(item.tmencod, e.target.value)
//   //             }
//   //           >
//   //             <option value="Y">Yes</option>
//   //             <option value="N">No</option>
//   //             <option value="S">Skip</option>
//   //           </select>
//   //         ),
//   //       }));

//   //       // Columns configuration for the table
//   //       const columns = [
//   //         { label: "Sr", field: "Sr", sort: "asc" },
//   //         { label: "Description", field: "Description", sort: "asc" },
//   //         { label: "Permissions", field: "Permissions", sort: "asc" },
//   //       ];
//   //       console.log(transformedData, "transformData");

//   //       // Set the transformed data for the table
//   //       setData({ columns, rows: transformedData });
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error:", error.message);
//   //       throw error;
//   //     });
//   // }
//   function fetchDataForUserId() {
//     console.log("call the api");
//     const apiUrl = `${apiLinks}/GetMenu.php`;
//     const data = { FUsrId: tusrid, code: organisation.code };
//     const formData = new URLSearchParams(data).toString();

//     return axios
//       .post(apiUrl, formData)
//       .then((response) => {
//         const apiData = response.data;

//         // Alert the response from the API
//         alert(JSON.stringify(apiData)); // Show the response in an alert

//         // Check if apiData is an array
//         if (!Array.isArray(apiData)) {
//           console.error("Expected apiData to be an array, but got:", apiData);
//           alert(
//             "Unexpected response format from the API. Check the console for details."
//           );
//           return; // Exit the function if the data is not an array
//         }

//         const mainMenuItem = apiData.find(
//           (item) => item.tmencod === `${activeTab}-00-00`
//         );

//         if (!mainMenuItem) {
//           console.log("Main menu item not found for tab:", activeTab);
//           return;
//         }

//         const subItems = apiData.filter((subItem) => {
//           return subItem.tmencod.startsWith(`${activeTab}-`);
//         });

//         // Transform data for rendering
//         const transformedData = subItems.map((item) => ({
//           Sr: item.tmencod,
//           Description: item.tmendsc,
//           Permissions: (
//             <select
//               style={{
//                 height: "20px",
//                 fontSize: "12px",
//                 padding: "0px",
//                 textAlign: "center",
//                 color: fontcolor, // Apply dynamic font color
//                 backgroundColor: getcolor, // Apply dynamic background color
//                 border: "1px solid #ccc", // Optional: to make sure the border color is visible
//               }}
//               value={item.Permission}
//               onChange={(e) =>
//                 handlePermissionChange(item.tmencod, e.target.value)
//               }
//             >
//               <option value="Y">Yes</option>
//               <option value="N">No</option>
//               <option value="S">Skip</option>
//             </select>
//           ),
//         }));

//         // Columns configuration for the table
//         const columns = [
//           { label: "Sr", field: "Sr", sort: "asc" },
//           { label: "Description", field: "Description", sort: "asc" },
//           { label: "Permissions", field: "Permissions", sort: "asc" },
//         ];
//         console.log(transformedData, "transformData");

//         // Set the transformed data for the table
//         setData({ columns, rows: transformedData });
//       })
//       .catch((error) => {
//         console.error("Error:", error.message);
//         alert(
//           "An error occurred while fetching data. Check the console for details."
//         );
//         throw error;
//       });
//   }

//   function handlePermissionChange(menuCode, newPermissionValue) {
//     Update_Menu({ id: tusrid, mcode: menuCode, permission: newPermissionValue })
//       .then(() => {
//         fetchDataForUserId(tusrid);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }
//   const [getthecustomer, setthecustomer] = useState([]);
//   const passthecodegetcustomer = (code) => {
//     if (code === "1-00-00") {
//       const customerlist = [
//         {
//           id: "1",
//           customer: "Sohaib",
//         },
//         {
//           id: "2",
//           customer: "Ahmed",
//         },
//         {
//           id: "3",
//           customer: "Arsalan",
//         },
//       ];
//       console.log(customerlist, "customerlist");
//       setthecustomer(customerlist);
//       return ["Sohaib", "Ali", "Ahmed"];
//     } else {
//       setthecustomer([]);
//     }
//   };
//   function Update_Menu(users) {
//     const apiUrl = `${apiLinks}/SavePermission.php`;
//     const data = {
//       code: organisation.code,
//       FUsrId: tusrid,
//       FMenCod: users.mcode,
//       FUsrPem: users.permission,
//     };
//     console.log("Data:", data);
//     const formData = new URLSearchParams(data).toString();

//     return axios
//       .post(apiUrl, formData)
//       .then((response) => {
//         fetchDataForUserId();
//         console.log(
//           "Update response:",
//           response.data,
//           user.userid,
//           organisation.code
//         );
//         dispatch(fetchMenu(user.tusrid, organisation.code));
//         setAlertData({
//           type: "success",
//           message: response.data.message,
//         });
//         setTimeout(() => {
//           setAlertData(null);
//         }, 3000);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         throw error;
//       });
//   }

//   const handleDoubleClick = () => {
//     const newPermission = toggleState ? "Y" : "N";
//     const updatedRows = getdata.rows.map((row) => {
//       return {
//         ...row,
//         Permissions: (
//           <select
//             value={newPermission}
//             onChange={(e) =>
//               handlePermissionChange(row.tmencod, e.target.value)
//             }
//             className="form-select"
//           >
//             <option value="Y">Yes</option>
//             <option value="N">No</option>
//             <option value="S">Skip</option>
//           </select>
//         ),
//       };
//     });
//     setData({ ...getdata, rows: updatedRows });
//     setToggleState(!toggleState);
//   };

//   const submit = () => {};

//   function handleTabClick(tabNumber) {
//     console.log("Tab clicked:", tabNumber);
//     setActiveTab(tabNumber);
//   }

//   const contentStyle = {
//     backgroundColor: getcolor,
//     height: "100vh",
//     width: isSidebarVisible ? "calc(100vw - 5vw)" : "100vw",
//     marginLeft: isSidebarVisible ? "5vw" : "25vh",
//     transition: isSidebarVisible
//       ? "margin-left 2s ease-in-out, margin-right 2s ease-in-out"
//       : "margin-left 2s ease-in-out, margin-right 2s ease-in-out",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "start",
//     overflowX: "hidden",
//     overflowY: "hidden",
//     wordBreak: "break-word",
//     textAlign: "center",
//     maxWidth: "1000px",
//     fontSize: "15px",
//     fontStyle: "normal",
//     fontWeight: "400",
//     lineHeight: "23px",
//     fontFamily: '"Poppins", sans-serif',
//   };
//   useEffect(() => {
//     document.documentElement.style.setProperty("--font-color", fontcolor);
//   }, [fontcolor]);
//   useEffect(() => {
//     document.documentElement.style.setProperty(
//       "--backgroundcolor-color",
//       getcolor
//     );
//   }, [getcolor]);
//   const [selectedDescription, setSelectedDescription] = useState(null);
//   return (
//     <>
//       <div
//         style={{
//           backgroundColor: getcolor,
//           height: "100vh",
//           width: "80vw",
//           overflowX: "hidden",
//           overflowY: "hidden",
//         }}
//       >
//         {alertData && (
//           <Alert
//             severity={alertData.type}
//             style={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               width: "30%",
//               marginLeft: "35%",
//               zIndex: 9999, // Ensuring this is very high
//               textAlign: "center",
//             }}
//           >
//             {alertData.message}
//           </Alert>
//         )}
//         <div style={contentStyle}>
//           <div
//             style={{
//               width: "60vw",
//               height: "73vh",
//               border: `1px solid ${fontcolor}`,
//               alignItems: "center",
//               justifyContent: "center",
//               borderRadius: "8px",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//               backgroundColor: getcolor,
//               color: fontcolor,
//             }}
//           >
//             <NavComponent textdata="Menu User" />
//             <br />
//             <div style={{ display: "flex", height: "100%" }}>
//               {/* Vertical Tabs */}
//               <div
//                 style={{
//                   width: "25%",
//                   backgroundColor: "#5aa4f2",
//                   padding: "10px",
//                   height: "64vh",
//                 }}
//               >
//                 <Tabs
//                   style={{ width: "100%" }}
//                   activeKey={activeTab.toString()}
//                   onSelect={(k) => handleTabClick(parseInt(k))}
//                   id="vertical-tab-example"
//                   className="flex-column"
//                 >
//                   {[
//                     "Dashboard   ",
//                     "Files       ",
//                     "Transactions",
//                     "Reports     ",
//                     "Utilities   ",
//                   ].map((tabLabel, index) => (
//                     <Tab
//                       eventKey={index}
//                       title={
//                         <span
//                           style={{
//                             color: "black",
//                             fontSize: "12px",
//                           }}
//                         >
//                           {tabLabel}
//                         </span>
//                       }
//                       key={index}
//                     >
//                       {/* You can add tab-specific content here if needed */}
//                     </Tab>
//                   ))}
//                 </Tabs>
//               </div>

//               {/* Table Section */}
//               <div
//                 style={{ width: "25%", padding: "0px 2px 0 10px" }}
//                 className="custom-scrollbar"
//               >
//                 <table
//                   className="myTable"
//                   style={{
//                     fontSize: "14px",
//                     width: "100%",
//                     borderCollapse: "collapse",
//                     backgroundColor: getcolor,
//                   }}
//                 >
//                   <thead
//                     style={{
//                       fontWeight: "bold",
//                       height: "40px",
//                       backgroundColor: "#3368b5",
//                       color: "#fff",
//                       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
//                     }}
//                   >
//                     <tr>
//                       <th style={{ padding: "10px", textAlign: "center" }}>
//                         Description
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {getdata.rows.map((row, rowIndex) => (
//                       <tr
//                         key={rowIndex}
//                         style={{
//                           height: "40px",
//                           borderBottom: "1px solid #ddd",
//                           backgroundColor: getcolor,
//                           color: "black",
//                         }}
//                       >
//                         <td
//                           style={{
//                             fontSize: "14px",
//                             padding: "10px",
//                             width: "35%",
//                             textAlign: "left",
//                             backgroundColor:
//                               selectedDescription === row.Description
//                                 ? "#5aa4f2"
//                                 : "",
//                             color:
//                               selectedDescription === row.Description
//                                 ? "black"
//                                 : fontcolor,
//                           }}
//                           onClick={() => {
//                             passthecodegetcustomer(row.Sr);
//                             setSelectedDescription(row.Description);
//                           }}
//                         >
//                           {row.Description}
//                         </td>
//                       </tr>
//                     ))}
//                     {Array.from({
//                       length: Math.max(0, 20 - getdata.rows.length),
//                     }).map((_, rowIndex) => (
//                       <tr
//                         key={`blank-${rowIndex}`}
//                         style={{
//                           height: "40px",
//                           backgroundColor: getcolor,
//                           color: fontcolor,
//                         }}
//                       >
//                         <td>&nbsp;</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div
//                 style={{ width: "25%", padding: "0px 1px 0 2px" }}
//                 className="custom-scrollbar"
//               >
//                 <table
//                   className="myTable"
//                   style={{
//                     fontSize: "14px",
//                     width: "100%",
//                     borderCollapse: "collapse",
//                     backgroundColor: getcolor,
//                   }}
//                 >
//                   <thead
//                     style={{
//                       fontWeight: "bold",
//                       height: "40px",
//                       backgroundColor: "#3368b5",
//                       color: "#fff",
//                       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
//                     }}
//                   >
//                     <tr>
//                       <th style={{ padding: "10px", textAlign: "center" }}>
//                         Customer
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {getthecustomer.map((row, rowIndex) => (
//                       <tr
//                         key={rowIndex}
//                         style={{
//                           height: "40px",
//                           borderBottom: "1px solid #ddd",
//                           backgroundColor: getcolor,
//                           color: "black",
//                         }}
//                       >
//                         <td
//                           style={{
//                             fontSize: "14px",
//                             padding: "10px",
//                             width: "35%",
//                             textAlign: "left",
//                             // backgroundColor: "#5aa4f2",
//                             color: fontcolor,
//                           }}
//                         >
//                           {row.customer}
//                         </td>
//                       </tr>
//                     ))}
//                     {Array.from({
//                       length: Math.max(0, 20 - getdata.rows.length),
//                     }).map((_, rowIndex) => (
//                       <tr
//                         key={`blank-${rowIndex}`}
//                         style={{
//                           height: "40px",
//                           backgroundColor: getcolor,
//                           color: fontcolor,
//                         }}
//                       >
//                         <td>&nbsp;</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div
//                 style={{ width: "25%", padding: "0px 1px 0 2px" }}
//                 className="custom-scrollbar"
//               >
//                 <table
//                   className="myTable"
//                   style={{
//                     fontSize: "14px",
//                     width: "100%",
//                     borderCollapse: "collapse",
//                     backgroundColor: getcolor,
//                   }}
//                 >
//                   <thead
//                     style={{
//                       fontWeight: "bold",
//                       height: "40px",
//                       backgroundColor: "#3368b5",
//                       color: "#fff",
//                       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
//                     }}
//                   >
//                     <tr>
//                       <th style={{ padding: "10px", textAlign: "center" }}>
//                         Check
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {getthecustomer.map((row, rowIndex) => (
//                       <tr
//                         key={rowIndex}
//                         style={{
//                           height: "40px",
//                           borderBottom: "1px solid #ddd",
//                           backgroundColor: getcolor,
//                           color: "black",
//                         }}
//                       >
//                         <td
//                           style={{
//                             fontSize: "14px",
//                             padding: "10px",
//                             width: "35%",
//                             textAlign: "left",
//                             // backgroundColor: "#5aa4f2",
//                             color: fontcolor,
//                           }}
//                         >
//                           {row.customer}
//                         </td>
//                       </tr>
//                     ))}
//                     {Array.from({
//                       length: Math.max(0, 20 - getdata.rows.length),
//                     }).map((_, rowIndex) => (
//                       <tr
//                         key={`blank-${rowIndex}`}
//                         style={{
//                           height: "40px",
//                           backgroundColor: getcolor,
//                           color: fontcolor,
//                         }}
//                       >
//                         <td>&nbsp;</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <SingleButton
//                 to="/UserManagement"
//                 text="Return"
//                 style={{ backgroundColor: "#186DB7", width: "120px" }}
//               />
//               <SingleButton
//                 to="/AddUser1"
//                 text="User"
//                 style={{ backgroundColor: "#186DB7", width: "120px" }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MenuAdmin;

import { Form } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../Admin/Admin.css";
import NavComponent from "../../../Navform/navbarform";
import ButtonGroupp from "../../../Button/ButtonGroup/ButtonGroup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import StatusSelect from "../../../StatusSelected/StatusSelected";
import { isLoggedIn, getUserData, getOrganisationData } from "../../../../Auth";
import MenuAdminModal from "./MenuAdminModal";
import { useMutation } from "@tanstack/react-query";
import { useTheme } from "../../../../../ThemeContext";
import {
  fetchGetCrystalCustomer,
  fetchGetCrystalMenu,
} from "../../../../Redux/action";
import { useSelector, useDispatch } from "react-redux";
function formatToThreeDigits(number) {
  // Convert the number to a string and pad with leading zeros if necessary
  return number.toString().padStart(3, "0");
}
function removeParentDirectories(path) {
  if (typeof path === "string") {
    return path.replace("../../", "");
  }
  console.error("Invalid path:", path);
  return "";
}
function MenuAdmin() {
  const dispatch = useDispatch();

  const user = getUserData();
  const organisation = getOrganisationData();
  const { apiLinks } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    AccountCodeform: "",
    Descriptionform: "",
    UrduFormDescription: "",
    Status: "",
    inputform4: "",
    inputform5: "",
    inputform6: "",
    inputform7: "",
    inputform8: "",
    inputform9: "",
    inputform10: "",
    inputform11: "",
    inputform12: "",
    inputform13: "",
    inputform14: "",
  });
  const { data, loading, error } = useSelector((state) => state.getcrystalmenu);
  const [dataa, setDataa] = useState([]);

  // Only fetch once when component mounts
  useEffect(() => {
    console.log(data, "dassdfsfsdfsdfasdf");
    if (data?.length === 0) {
      dispatch(fetchGetCrystalMenu());
    }
  }, [dispatch]);

  useEffect(() => {
    setDataa(data);
  }, [data]);

  const Codefocus = () => {
    if (Code.current) {
      Code.current.focus();
    }
  };
  const [alertData, setAlertData] = useState(null);
  const fontFamily = "verdana";
  const Code = useRef(null);
  const Description = useRef(null);
  const Status = useRef(null);
  const inputform4ref = useRef(null);
  const inputform5ref = useRef(null);
  const inputform6ref = useRef(null);
  const inputform7ref = useRef(null);
  const inputform8ref = useRef(null);
  const inputform9ref = useRef(null);
  const inputform10ref = useRef(null);
  const inputform11ref = useRef(null);
  const inputform12ref = useRef(null);
  const inputform13ref = useRef(null);
  const inputform14ref = useRef(null);
  const Submit = useRef(null);
  const Clear = useRef(null);
  const Return = useRef(null);
  const SearchBox = useRef(null);
  //////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////

  const focusNextInput = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const [errors, setErrors] = useState({});

  const [selectedImage1, setSelectedImage1] = useState(null);

  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      console.log("file", file);
      const imgElement = document.getElementById("pic1-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };

  const [geturdu, setGeturdu] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const checks = [
      {
        value: formData?.AccountCodeform,
        message: "Please fill your Userid",
      },
      {
        value: formData?.Descriptionform,
        message: "Please fill your User Name",
      },
    ];

    for (const check of checks) {
      if (!check.value) {
        setAlertData({
          type: "error",
          message: check.message,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 3000);
        return;
      }
    }
    // const data = {
    //   AccountCodeform: formData.AccountCodeform,
    //   Descriptionform: formData.Descriptionform,
    //   Status: formData.Status,
    //   inputform4: formData.inputform4,
    //   inputform5: formData.inputform5,
    //   inputform6: formData.inputform6,
    //   inputform7: formData.inputform7,
    //   inputform8: formData.inputform8,
    //   inputform9: formData.inputform9,
    //   inputform10: formData.inputform10,
    //   inputform11: formData.inputform11,
    // };
    // console.log("Form Data:", data);
    // Prepare form data for submission
    const formDataa = new FormData();
    formDataa.append("FMenCod", formData.AccountCodeform);
    formDataa.append("FMenDsc", formData.Descriptionform);
    formDataa.append("FMenSts", formData.Status);
    formDataa.append("FMenUrl", formData.inputform4);
    formDataa.append("FMenRem", formData.inputform5);
    // formDataa.append("mobileno", formData.inputform6);
    // formDataa.append("email", formData.inputform7);
    // formDataa.append("menu", formData.inputform8);
    // formDataa.append("duepaymentdate", formData.inputform9);
    // formDataa.append("duepayment", formData.inputform10);
    // formDataa.append("lastpaymentdate", formData.inputform11);
    // formDataa.append("lastpayment", formData.inputform12);
    formDataa.append("FCurUsr", user.tusrid);

    console.log("Submitting Form Data:", formDataa);

    try {
      const response = await axios.post(
        `${apiLinks}/SaveCrystalMenu.php`,
        formDataa,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("API Response:", response);

      if (response.data.error === 200) {
        Code.current.focus();
        setTimeout(() => {
          dispatch(fetchGetCrystalCustomer()); // Re-fetch data from the server
        }, 1000);

        // Clear form fields
        setFormData({
          ...formData,
          AccountCodeform: "",
          Descriptionform: "",
          Status: "",
          inputform4: "",
          inputform5: "",
          inputform6: "",
          inputform7: "",
          inputform8: "",
          inputform9: "",
          inputform10: "",
          inputform11: "",
          inputform12: "",
        });

        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 1000);
      } else {
        setAlertData({
          type: "error",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlertData({
        type: "error",
        message: "Form submission failed. Please try again.",
      });
      setTimeout(() => {
        setAlertData(null);
      }, 2000);
    } finally {
      console.log("Form submission process completed.");
    }
  };

  // Function to handle Enter key press
  const handleEnterKeyPress = (ref, e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on Enter key press
      if (ref && ref.current) {
        ref.current.focus();
      }
    }
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [textdata, settextdata] = useState("Menu Management");

  const handleCloseModal = () => {
    setSearchText("");
    setHighlightedRowIndex(0);
    settextdata("Menu Management");

    setModalOpen(false);
  };

  const handleDoubleClick = (e) => {
    focusNextInput(Code);
    console.log("====== handle double click=======");
    // setSearchText(e.target.value);
    setModalOpen(true);
  };

  const handleBlurRVC = (e) => {
    // // Convert nextItemId to string before calling padStart
    const formattedValue = String(formData.AccountCodeform).padStart(3, "0");
    console.log("dataa item:", dataa);
    // const accountCodeValue = String(formData.AccountCodeform);
    // const part1 = accountCodeValue.substring(0, 2);
    // const part2 = accountCodeValue.substring(2, 5);
    // const part3 = accountCodeValue.substring(5, 8).padStart(3, "0");
    // const formattedValue = `${part1}-${part2}-${part3}`;

    setFormData({
      ...formData,
      AccountCodeform: formattedValue,
    });
    console.log("value", formattedValue);
    setTimeout(() => {
      const selectedItem = dataa.find(
        (item) => item.tmencod === formattedValue
      );

      console.log("Selected item:", formattedValue);

      if (selectedItem) {
        setFormData({
          ...formData,
          AccountCodeform: selectedItem.tmencod || "",
          Descriptionform: selectedItem.tmendsc || "",
          Status: selectedItem.tmensts || "",
          inputform4: selectedItem.tmenurl || "",
          inputform5: selectedItem.tmenrem || "",
        });
        handlePrediction(selectedItem.tmendsc).then((result) => {
          setGeturdu(result);
        });
      } else {
        setFormData({
          ...formData,
          Descriptionform: "",
          Status: "",
          inputform4: "",
          inputform5: "",
          inputform6: "",
          inputform7: "",
          inputform8: "",
          inputform9: "",
          inputform10: "",
          inputform11: "",
          inputform12: "",
          inputform13: "",
          inputform14: "",
        });
      }
    }, 500);
  };
  const handleInputChangefetchdata = async (e) => {
    console.log("show the value is:", e.target.value);
    let inputValue = e.target.value;
    setFormData({
      ...formData,
      AccountCodeform: e.target.value,
    });
  };

  const handlePrediction = async (name) => {
    const url = "https://rehman1603-english-to-urdu.hf.space/run/predict";
    const payload = {
      data: [name],
    };

    try {
      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(response, "response");

      if (response.status === 200) {
        const result = response.data.data[0];

        console.log(result, "result");
        return result; // Return the result for use in the calling function
      } else {
        console.error("Failed to fetch prediction");
        return null; // Return null or some default value if the request failed
      }
    } catch (error) {
      console.error("Error during prediction:", error);
      return null; // Return null or some default value in case of an error
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = value;
    if (name === "AccountCodeform") {
      console.log("Searching for:", value);

      // Remove all non-digit characters
      let rawValue = value.replace(/\D/g, "");

      // Limit to 8 digits (to allow full formatting into 00-000-000)
      if (rawValue.length > 8) {
        rawValue = rawValue.slice(0, 8);
      }

      // Format the value as 00-000-000
      if (rawValue.length === 8) {
        formattedValue = `${rawValue.slice(0, 2)}-${rawValue.slice(
          2,
          5
        )}-${rawValue.slice(5)}`;
      } else if (rawValue.length > 2) {
        formattedValue = `${rawValue.slice(0, 2)}-${rawValue.slice(2)}`;
      }

      console.log("Formatted Value:", formattedValue);

      // Find the matching item based on the formatted value
      const selectedItem = dataa.find(
        (item) => item.tmencod === formattedValue
      );

      console.log("Selected item:", selectedItem);

      if (selectedItem) {
        // Set form data with the selected item's values
        setFormData({
          ...formData,
          AccountCodeform: formattedValue || "",
          Descriptionform: selectedItem.tmendsc || "",
          Status: selectedItem.tmensts || "",
          inputform4: selectedItem.tmenurl || "",
          inputform5: selectedItem.tmenrem || "",
        });

        // Handle prediction for Urdu translation
        handlePrediction(selectedItem.tmendsc).then((result) => {
          setGeturdu(result);
        });
      } else {
        // Reset form fields if no item is found
        setFormData({
          ...formData,
          AccountCodeform: formattedValue,
          Descriptionform: "",
          Status: "",
          inputform4: "",
          inputform5: "",
          inputform6: "",
          inputform7: "",
          inputform8: "",
          inputform9: "",
          inputform10: "",
          inputform11: "",
          inputform12: "",
          inputform13: "",
          inputform14: "",
        });
      }
    }

    if (name === "Descriptionform") {
      console.log("Searching for:", formattedValue);

      handlePrediction(formattedValue).then((result) => {
        setGeturdu(result);
        console.log("resulttttttttttt");
      });
    }
    if (name === "inputform8") {
      const lowercaseValue = value.toLowerCase();
      setFormData({
        ...formData,
        inputform8: lowercaseValue,
      });
    }

    if (name === "inputform11") {
      const lowercaseValue = value.toLowerCase();
      setFormData({
        ...formData,
        inputform11: lowercaseValue,
      });
    } else if (name === "inputform5") {
      const lowercaseValue = value;
      setFormData({
        ...formData,
        inputform5: lowercaseValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    }
    if (name === "UrduFormDescription") {
      console.log("Searching for:", formattedValue);
      setGeturdu(formattedValue);
    }
  };

  const resetData = () => {
    setSearchText("");
  };
  const [highlightedRowIndex, setHighlightedRowIndex] = useState(0);
  const handleRowClick = (selectedItem, rowIndex) => {
    console.log("handleRowClickAccount", selectedItem);
    setModalOpen(false);
    setFormData({
      ...formData,
      AccountCodeform: selectedItem.tmencod || "",
      Descriptionform: selectedItem.tmendsc || "",
      Status: selectedItem.tmensts || "",
      inputform4: selectedItem.tmenurl || "",
      inputform5: selectedItem.tmenrem || "",
    });
    handlePrediction(selectedItem.tcmpdsc).then((result) => {
      setGeturdu(result);
    });

    settextdata("Menu Management");

    resetData();
  };

  const handleFocus = (codeparam) => {
    if (codeparam.current) {
      codeparam.current.style.backgroundColor = "orange";
    }
  };

  const handleSave = () => {
    handleFormSubmit();
  };
  const handleClear = () => {
    setFormData({
      ...formData,
      Descriptionform: "",
      Status: "",
      inputform4: "",
      inputform5: "",
      inputform6: "",
      inputform7: "",
      inputform8: "",
      inputform9: "",
      inputform10: "",
      inputform11: "",
      inputform12: "",
      inputform13: "",
      inputform14: "",
    });

    if (Code.current) {
      Code.current.focus();
    }
  };

  const handleReturn = () => {
    navigate("/MainPage");
  };

  const handleBlur = (codeparam) => {
    if (codeparam.current) {
      codeparam.current.style.backgroundColor = "#3368B5";
    }
  };
  const {
    isSidebarVisible,
    toggleSidebar,
    getcolor,
    fontcolor,
    toggleChangeColor,
  } = useTheme();
  const contentStyle = {
    backgroundColor: getcolor,
    height: "100vh",
    width: isSidebarVisible ? "calc(100vw - 55%)" : "70%",
    position: "relative",
    top: "50%",
    left: isSidebarVisible ? "50%" : "60%",
    transform: "translate(-50%, -50%)",
    transition: isSidebarVisible
      ? "left 3s ease-in-out, width 2s ease-in-out"
      : "left 3s ease-in-out, width 2s ease-in-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    overflowX: "hidden",
    overflowY: "hidden",
    // wordBreak: "break-word",
    // textAlign: "center",
    maxWidth: "500px",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "23px",
    fontFamily: '"Poppins", sans-serif',
  };
  useEffect(() => {
    document.documentElement.style.setProperty("--background-color", getcolor);
  }, [getcolor]);
  useEffect(() => {
    document.documentElement.style.setProperty("--font-color", fontcolor);
  }, [fontcolor]);

  return (
    <>
      <div
        style={{
          backgroundColor: getcolor,
          height: "100vh",
          width: "80vw",
          overflowX: "hidden",
          overflowY: "hidden",
        }}
      >
        {alertData && (
          <Alert
            severity={alertData.type}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "30%",
              marginLeft: "35%",
              zIndex: 9999, // Ensuring this is very high
              textAlign: "center",
            }}
          >
            {alertData.message}
          </Alert>
        )}
        <div style={contentStyle}>
          <div
            className="col-md-12 "
            style={{
              border: `1px solid ${fontcolor}`,
              borderRadius: "9px",
            }}
          >
            <NavComponent textdata={textdata} />

            <br />
            <Form
              onSubmit={handleFormSubmit}
              style={{
                backgroundColor: getcolor,
                color: fontcolor,
              }}
            >
              <div className="row">
                <div className="col-sm-12">
                  <br />

                  <div className="row">
                    <div className="col-sm-3 label-customer">Code:</div>
                    <div className="col-sm-4">
                      <Form.Control
                        type="text"
                        className="form-control-customer custom-input"
                        placeholder="Code"
                        name="AccountCodeform"
                        value={formData.AccountCodeform}
                        // onFocus={(e) => e.target.select()}
                        onChange={(e) => handleInputChange(e)}
                        style={{
                          fontSize: "15px",
                          padding: "10px",
                          textAlign: "left",
                          borderRadius: "8px",
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleBlurRVC();
                            handleEnterKeyPress(Status, e);
                            const upperCaseValue = e.target.value.toUpperCase();

                            if (dataa && dataa.length > 0) {
                              const selectedItem = dataa.find(
                                (item) => item.tmencod === upperCaseValue
                              );

                              if (selectedItem) {
                                console.log("selectedItem:", selectedItem);
                                handleEnterKeyPress(Status, e);
                              } else if (upperCaseValue.length < 10) {
                                // setAlertData({
                                //   type: "success",
                                //   message: "Fetch Data",
                                // });
                                // setTimeout(() => {
                                //   setAlertData(null);
                                // }, 3000);
                              } else {
                                handleEnterKeyPress(Status, e);
                              }
                            } else {
                              console.warn(
                                "Data rows are not available or empty."
                              );
                            }
                          }
                        }}
                        onFocus={(e) => {
                          // setTimeout(() => {
                          e.target.select();
                          // }, 500);
                        }}
                        onDoubleClick={(e) => {
                          handleDoubleClick(e);
                          setTimeout(() => {
                            focusNextInput(SearchBox);
                          }, 100);
                        }}
                        ref={Code}
                      />
                    </div>
                    <div className="col-sm-2 label-customer">Status:</div>
                    <div className="col-sm-3">
                      <Form.Control
                        as="select"
                        name="Status"
                        value={formData.Status}
                        onChange={handleInputChange}
                        className={`form-control-customer ${
                          errors.Status ? "border-red" : ""
                        }`}
                        style={{
                          height: "28px",
                          padding: "0px",
                          paddingLeft: "5px",
                        }}
                        onKeyDown={(e) => handleEnterKeyPress(Description, e)}
                        ref={Status}
                      >
                        <option
                          style={{
                            backgroundColor: getcolor,
                            color: fontcolor,
                          }}
                          value="Y"
                        >
                          Yes
                        </option>
                        <option
                          style={{
                            backgroundColor: getcolor,
                            color: fontcolor,
                          }}
                          value="N"
                        >
                          No
                        </option>
                      </Form.Control>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3 label-item">Description:</div>
                    <div className="col-sm-9">
                      <Form.Control
                        type="text"
                        id="Descriptionform"
                        placeholder="Description"
                        name="Descriptionform"
                        className={`form-control-customer ${
                          errors.Descriptionform ? "border-red" : ""
                        }`}
                        value={formData.Descriptionform}
                        ref={Description}
                        onFocus={(e) => e.target.select()}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(inputform4ref, e)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3 label-customer">URL:</div>
                    <div className="col-sm-9">
                      <Form.Control
                        type="text"
                        id="inputform4"
                        placeholder="URL"
                        name="inputform4"
                        className={`form-control-customer ${
                          errors.inputform4 ? "border-red" : ""
                        }`}
                        style={{ textAlign: "left" }}
                        value={formData.inputform4.toLocaleLowerCase()}
                        ref={inputform4ref}
                        onFocus={(e) => e.target.select()}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(inputform5ref, e)}
                      />
                    </div>
                    <div className="col-sm-2"></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3 label-customer">Remarks:</div>
                    <div className="col-sm-9">
                      <Form.Control
                        as="textarea"
                        id="inputform5"
                        placeholder="Remarks"
                        name="inputform5"
                        className={`form-control-remarkss ${
                          errors.inputform5 ? "border-red" : ""
                        }`}
                        style={{
                          textAlign: "left",
                          height: "250px",
                        }} // Increased height
                        value={formData.inputform5}
                        ref={inputform5ref}
                        onFocus={(e) => e.target.select()}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Submit, e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Form>

            {/* // three button in this  */}
            <ButtonGroupp
              Submit={Submit}
              handleFocus={handleFocus}
              handleBlur={handleBlur}
              handleSave={handleSave}
              handleReturn={handleReturn}
              handleClear={handleClear}
              handleFormSubmit={handleFormSubmit}
            />
            <MenuAdminModal
              isOpen={isModalOpen}
              handleClose={handleCloseModal}
              title="Select Menu"
              technicians={dataa}
              searchRef={SearchBox}
              handleRowClick={handleRowClick}
              firstColKey="tmencod"
              secondColKey="tmendsc"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuAdmin;
