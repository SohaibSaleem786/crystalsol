// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../Loginn/Login.css";
// import Shop from "../../../image/metal.jpg";
// // import Metal from "../../../image/grmetal.png";
import Crystall from "../../../image/logo.png";
// import axios from "axios";
// // import { useAuth } from "../../AuthContext"; // Adjust the path based on your project structure
// import { ToastContainer, toast } from "react-toastify";
// import Alert from "@mui/material/Alert";
// // import GRMETAL from "../../../image/grmetal.png";
// import { useTheme } from "../../../ThemeContext";
// import Technician from "../../../image/technician.png";
// import { Container, Row, Spinner, Navbar, Button, Form } from "react-bootstrap";
// import AC from "../../../image/UMAIR.png";
// import Image1 from "../../../image/image1.jpeg";
// import Image2 from "../../../image/image2.jpeg";
// import Image3 from "../../../image/image3.jpeg";
// import Key from "../../../image/keys.png";
// import Home from "../../../image/homeapp.png";
// import { Link } from "react-router-dom";
// import CryptoJS from "crypto-js";

// const secretKey = "your-secret-key-roomiBaba-@123786";

// const encryptPath = (path) => {
//   return encodeURIComponent(CryptoJS.AES.encrypt(path, secretKey).toString());
// };

// function Loginn() {
//   const navigate = useNavigate();

//   const [alertData, setAlertData] = useState(null);
//   const { primaryColor, secondaryColor, apiLinks } = useTheme();

//   const [userData, setUserData] = useState({
//     userid: "",
//     password: "",
//     loading: false,
//   });

//   // const { isLoggedIn, userData, login } = useAuth();
//   const userid = useRef();
//   const password = useRef();
//   const Code = useRef();

//   function UserLogin() {
//     const data = {
//       userid: userid.current.value,
//       password: password.current.value,
//       code: Code.current.value,
//     };
//     const formData = new URLSearchParams(data).toString();

//     axios
//       .post(`https://crystalsolutions.com.pk/api/login.php`, formData, {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       })
//       .then((response) => {
//         if (response.data.error === 200) {
//           console.log(response.data);
//           localStorage.setItem("isLoggedIn", "true");
//           localStorage.setItem("user", JSON.stringify(response.data.user));
//           localStorage.setItem(
//             "organisation",
//             JSON.stringify(response.data.organisation)
//           );

//           setAlertData({
//             type: "success",
//             message: `${response.data.message}`,
//           });
//           setTimeout(() => {
//             setAlertData(null);
//             navigate("/MainPage");
//           }, 500);
//         } else {
//           console.log(response.data.message);

//           setAlertData({
//             type: "error",
//             message: `${response.data.message}`,
//           });
//           setTimeout(() => {
//             setAlertData(null);
//           }, 2000);
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }

//   useEffect(() => {
//     // Focus on the first input when the component mounts
//     if (userid.current) {
//       userid.current.focus();
//     }
//   }, []);
//   useEffect(() => {
//     // Focus on the first input when the component mounts
//     if (userid.current) {
//       userid.current.focus();
//     }
//   }, []);
//   const Enter1 = useRef(null);
//   const Enter2 = useRef(null);
//   const Enter3 = useRef(null);

//   const focusNextInput = (ref) => {
//     if (ref.current) {
//       ref.current.focus();
//     }
//   };

//   const handleEnterKeyPress = (ref, e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       focusNextInput(ref);
//     }
//   };

//   const handleFocus = (codeparam) => {
//     if (codeparam.current) {
//       codeparam.current.style.backgroundColor = "orange";
//     }
//   };

//   const handleBlur = (codeparam) => {
//     if (codeparam.current) {
//       codeparam.current.style.backgroundColor = "#3368B5";
//     }
//   };
//   return (
//     <>
//       <div
//         style={{
//           backgroundColor: "white",
//           // backgroundColor:'white',
//           position: "relative",
//           width: "100%",
//           height: "100vh",
//           overflow: "hidden",
//           fontFamily: "Verdana",
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
//               zIndex: 1000,
//               textAlign: "center",
//             }}
//           >
//             {alertData.message}
//           </Alert>
//         )}
//         <div className="row first-row">
//           <div className="row"></div>
//           <div className="row"></div>

//           <dir className="row ">
//             <div className="col-sm-2 "></div>

//             <div className="col-sm-1 itc-logo"></div>
//             <div className="col-sm-3 itc-name">
//               <img
//                 src={Crystal}
//                 alt="Login"
//                 className="technicial-logo"
//                 style={{ height: "10vh", width: "80%" }}
//               />
//             </div>
//             <div className="col-sm-5 itc-data">
//               Call: +92 304 4770075 +92 423518408 <br />
//               support@crystalsolutions.com.pk
//             </div>
//           </dir>
//         </div>
//         <div
//           className="row second-row"
//           style={{ backgroundColor: "gainsboro" }}
//         >
//           <div
//             className="row iner-card"
//             style={{ backgroundColor: "gainsboro" }}
//           >
//             {/* <div className="col-sm-2 AC-logo">
//               <img
//                 src={AC}
//                 alt="Company Logo"
//                 className="login-image"
//                 style={{ height: "15vh", width: "15vh" }}
//               />
//             </div> */}

//             <div className="col-sm-12 images">
//               <img
//                 src={Home}
//                 alt="Company Logo"
//                 className="login-image"
//                 style={{ height: "21vh", width: "100%" }}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="row third-row">
//           <div className="col-sm-4"></div>

//           <div className="col-sm-6">
//             <div
//               className="row"
//               style={{ marginLeft: "10px", marginTop: "10px" }}
//             >
//               <div
//                 className="login-form"
//                 style={{ backgroundColor: "white", height: "27vh" }}
//               >
//                 <div
//                   className="row"
//                   style={{
//                     margin: "10px 10px 10px 10px",
//                     fontWeight: "bold",
//                     fontSize: "15px",
//                     // textShadow: "1px 1px 1px #0e2238",
//                   }}
//                 >
//                   User Login
//                 </div>
//                 <div className="row">
//                   <div className="col-sm-9">
//                     <div className="row ">
//                       <div className="col-sm-4 label-login">Username:</div>
//                       <div className="col-sm-8">
//                         <Form.Control
//                           type="text"
//                           id="code"
//                           placeholder="userid"
//                           name="Name"
//                           className="form-control"
//                           ref={userid}
//                           style={{
//                             marginLeft: "-10px",
//                             borderRadius: "0",
//                             backgroundColor: "white",
//                             boxShadow: "none",
//                           }}
//                           onKeyDown={(e) => handleEnterKeyPress(password, e)}
//                         />
//                       </div>
//                     </div>
//                     <div
//                       className="row"
//                       style={{
//                         marginTop: "3px",
//                       }}
//                     >
//                       <div className="col-sm-4 label-login">Password:</div>
//                       <div className="col-sm-8 ">
//                         <Form.Control
//                           type="password"
//                           id="code"
//                           placeholder="password"
//                           name="password"
//                           className="form-control"
//                           ref={password}
//                           style={{
//                             marginLeft: "-10px",
//                             backgroundColor: "white",
//                             boxShadow: "none",
//                             borderRadius: "0",
//                           }}
//                           onKeyDown={(e) => handleEnterKeyPress(Code, e)}
//                         />
//                       </div>
//                     </div>
//                     <div
//                       className="row"
//                       style={{
//                         marginTop: "3px",
//                       }}
//                     >
//                       <div className="col-sm-4 label-login">Code:</div>
//                       <div className="col-sm-8 ">
//                         <Form.Control
//                           type="text"
//                           id="code"
//                           placeholder="Code"
//                           name="Code"
//                           className="form-control"
//                           ref={Code}
//                           style={{
//                             marginLeft: "-10px",
//                             backgroundColor: "white",
//                             boxShadow: "none",
//                             borderRadius: "0",
//                           }}
//                           onKeyDown={(e) => handleEnterKeyPress(Enter3, e)}
//                         />
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-sm-3"></div>
//                       <div className="col-sm-9">
//                         <button
//                           className=" btn-primary-itc"
//                           ref={Enter3}
//                           style={{ border: "none" }}
//                           onClick={UserLogin}
//                           type="submit"
//                           disabled={userData.loading}
//                           onFocus={() => handleFocus(Enter3)}
//                           onBlur={() => handleBlur(Enter3)}
//                         >
//                           Login
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-sm-3 keys">
//                     <img
//                       src={Key}
//                       alt="Login"
//                       className="login-image"
//                       style={{ height: "12vh", width: "12vh" }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Loginn;
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Loginn/Login.css";
import Crystal from "../../../image/logowithname.jpeg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Alert from "@mui/material/Alert";
import { useTheme } from "../../../ThemeContext";
import Key from "../../../image/keys.png";
import { Link } from "react-router-dom";

function Loginn() {
  const navigate = useNavigate();
  const [alertData, setAlertData] = useState(null);
  const { primaryColor, secondaryColor, apiLinks } = useTheme();
  const [userData, setUserData] = useState({
    userid: "",
    password: "",
    loading: false,
  });

  const userid = useRef();
  const password = useRef();
  const Code = useRef();

  const [isSignUp, setIsSignUp] = useState(false);

  function UserLogin() {
    const data = {
      userid: userid.current.value,
      password: password.current.value,
      code: Code.current.value,
    };
    const formData = new URLSearchParams(data).toString();

    axios
      .post(`https://crystalsolutions.com.pk/api/login.php`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.data.error === 200) {
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            navigate("/MainPage");
          }, 500);
          console.log(response.data);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem(
            "organisation",
            JSON.stringify(response.data.organisation)
          );
        } else {
          console.log(response.data.message);

          setAlertData({
            type: "error",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    if (userid.current) {
      userid.current.focus();
    }
  }, []);

  const Enter1 = useRef(null);
  const Enter2 = useRef(null);
  const Enter3 = useRef(null);

  const focusNextInput = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleEnterKeyPress = (ref, e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      focusNextInput(ref);
    }
  };

  const handleFocus = (codeparam) => {
    if (codeparam.current) {
      codeparam.current.style.backgroundColor = "orange";
    }
  };

  const handleBlur = (codeparam) => {
    if (codeparam.current) {
      codeparam.current.style.backgroundColor = "#3368B5";
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div
      style={{
        // backgroundColor: getcolor,
        height: "100vh",
        // width: "80vw",
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px",
        }}
      >
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            borderRadius: "15px",
            boxShadow:
              "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
            overflow: "hidden",
            maxWidth: "800px",
            margin: "auto",
          }}
          className={`container ${isSignUp ? "right-panel-active" : ""}`}
          id="container"
        >
          <div className="form-container sign-in-container">
            <form action="#">
              <img
                src={Crystall}
                alt="Logo"
                style={{ width: "30%", margin: "20px 0" }}
              />

              <div className="social-container">
                <a href="#" className="social" style={{ marginRight: "10px" }}>
                  <i
                    className="fab fa-facebook-f"
                    style={{ color: "#3b5998" }}
                  ></i>
                </a>
                <a href="#" className="social" style={{ marginRight: "10px" }}>
                  <i
                    className="fab fa-google-plus-g"
                    style={{ color: "#dd4b39" }}
                  ></i>
                </a>
                <a href="#" className="social">
                  <i
                    className="fab fa-linkedin-in"
                    style={{ color: "#0077b5" }}
                  ></i>
                </a>
              </div>

              <input
                type="text"
                placeholder="User ID"
                ref={userid}
                onKeyDown={(e) => handleEnterKeyPress(password, e)}
                style={{
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="password"
                placeholder="Password"
                ref={password}
                onKeyDown={(e) => handleEnterKeyPress(Code, e)}
                style={{
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="text"
                placeholder="Code"
                ref={Code}
                onChange={(e) =>
                  (e.target.value = e.target.value.toUpperCase())
                }
                onKeyDown={(e) => handleEnterKeyPress(Enter3, e)}
                style={{
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <a
                href="#"
                style={{
                  color: "#6c63ff",
                  fontSize: "14px",
                  display: "block",
                  margin: "10px 0",
                }}
              >
                Forgot your password?
              </a>
              <button
                className="btn-primary-itc"
                ref={Enter3}
                onClick={UserLogin}
                type="submit"
                // disabled={userData.loading}
                onFocus={() => handleFocus(Enter3)}
                onBlur={() => handleBlur(Enter3)}
                style={{
                  background: "#6c63ff",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                Sign In
              </button>
            </form>
          </div>
          <div className="form-container sign-up-container">
            <form action="#">
              <h1 style={{ color: "#6c63ff", fontWeight: "bold" }}>
                Create Account
              </h1>
              <div
                className="social-container"
                style={{ marginBottom: "20px" }}
              >
                <a href="#" className="social" style={{ marginRight: "10px" }}>
                  <i
                    className="fab fa-facebook-f"
                    style={{ color: "#3b5998" }}
                  ></i>
                </a>
                <a href="#" className="social" style={{ marginRight: "10px" }}>
                  <i
                    className="fab fa-google-plus-g"
                    style={{ color: "#dd4b39" }}
                  ></i>
                </a>
                <a href="#" className="social">
                  <i
                    className="fab fa-linkedin-in"
                    style={{ color: "#0077b5" }}
                  ></i>
                </a>
              </div>
              <span style={{ color: "#777", fontSize: "14px" }}>
                or use your email for registration
              </span>
              <input
                type="text"
                placeholder="Name"
                style={{
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="email"
                placeholder="Email"
                style={{
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="password"
                placeholder="Password"
                style={{
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                style={{
                  background: "#6c63ff",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "12px",
                  marginTop: "20px",
                }}
              >
                Sign Up
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 style={{ color: "#fff", fontWeight: "bold" }}>
                  Welcome Back!
                </h1>
                <p style={{ color: "#fff", fontSize: "14px" }}>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={toggleSignUp}
                  style={{
                    background: "#fff",
                    color: "#6c63ff",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "12px",
                    marginTop: "20px",
                  }}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 style={{ color: "#fff", fontWeight: "bold" }}>
                  Hello, Friend!
                </h1>
                <p style={{ color: "#fff", fontSize: "14px" }}>
                  Enter your personal details and start journey with us
                </p>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={toggleSignUp}
                  style={{
                    background: "#fff",
                    color: "#6c63ff",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "12px",
                    marginTop: "20px",
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginn;
