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
import Crystall from "../../../image/logowithname.jpeg";

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
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem(
            "organisation",
            JSON.stringify(response.data.organisation)
          );
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            navigate("/MainPage");

            setAlertData(null);
          }, 1000);
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
                style={{ width: "60%", margin: "20px 0" }}
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
