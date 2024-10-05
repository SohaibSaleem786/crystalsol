import React, { useState, useEffect, useContext, useRef } from "react";
import { Container, Nav, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Content } from "../../../../App";
import { useHotkeys } from "react-hotkeys-hook";
import { useForm } from "react-hook-form";
import axios from "axios";
import Header from "../../../MainComponent/Header/Header";
import Footer from "../../../MainComponent/Footer/Footer";

export default function AddUser1() {
  const navigate = useNavigate();
  const [alertData, setAlertData] = useState(null);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [code, setCode] = useState("");
  const tableTopColor = "#3368B5";
  const tableHeadColor = "#3368B5";
  const secondaryColor = "white";
  const btnColor = "#3368B5";
  const textColor = "white";
  const apiLink = "";

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserEmail(user.temladd);
      setUserId(user.id);
      // console.log(user.id, "abcdefghijklmnopqrstuvwxyz");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    axios
      .post(
        apiLink + "/utilties/AddUser.php",
        {
          UsrId: data.UsrId,
          CashCod: data.CashCod,
          StoreCod: data.StoreCod,
          EmployeeCod: data.EmployeeCod,
          TimeFrom: data.TimeFrom,
          TimeTo: data.TimeTo,
          UserName: data.UserName,
          Password: data.Password,
          ExpDate: data.ExpDate,
          Status: data.Status,
          Type: data.Type,
          Mobile: data.Mobile,
          Email: data.Email,
          AdminEmail: userEmail,
          AddUserId: userId,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )

      .then((response) => {
        console.log(response);
        setAlertData({
          type: "success",
          message: "Successful submitted",
        });
        reset();
        setTimeout(() => {
          setAlertData(null);
        }, 4000);
      })
      .catch((error) => {
        // console.log(error);
        setAlertData({
          type: "error",
          message: error.response
            ? error.response.data.Message
            : "Submission failed",
        });
        setTimeout(() => {
          setAlertData(null);
        }, 4000);
      });
  };

  // useHotkeys("esc", () => navigate("/sidebar"));

  return (
    <>
      {alertData && (
        <Alert
          severity={alertData.type}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "30%",
            marginLeft: "35%",
            zIndex: 1000,
            textAlign: "center",
          }}
        >
          {alertData.message}
        </Alert>
      )}
      {/* <Header /> */}
      <Container
        className="border border-dark"
        style={{ width: "60%", marginLeft: "20%", marginRight: "20%" }}
        id="ContainerStylingLocationMaintenance"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ margin: "0 -12px" }}>
            <Nav
              className="col-12 d-flex justify-content-between"
              style={{ backgroundColor: tableTopColor, color: textColor }}
            >
              <div className="col-2"></div>
              <div style={{ fontSize: "14px" }} className="col-8 text-center">
                <strong>Add New User</strong>
              </div>
              <div className="text-end col-2">
                <Link to="/usermanagement">
                  <i className="fa fa-close fa-2xl crossBtn"></i>
                </Link>
              </div>
            </Nav>
            <div style={{ margin: "0 10px 0 0" }}>
              <div className="d-flex justify-content-between my-1 col-12">
                <div className="d-flex col-12 justify-content-start align-items-center">
                  <label className="col-4 text-end">
                    <strong>UserId: &ensp;&ensp;</strong>
                  </label>
                  <input
                    className="col-3 border border-dark"
                    type="text"
                    placeholder="Type Here..."
                    id="searchInput"
                    autoComplete="off"
                    {...register("UsrId", {
                      required: "userId is required",
                    })}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between my-1 col-12">
                <div className="d-flex col-12 justify-content-start align-items-center">
                  <label className="col-4 text-end">
                    <strong>Cash Code: &ensp;&ensp;</strong>
                  </label>
                  <input
                    className="col-3 border border-dark"
                    type="number"
                    placeholder="##-##-###"
                    id="searchInput"
                    autoComplete="off"
                    {...register("CashCod", {
                      required: "Cash code is required",
                    })}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between my-1 col-12">
                <div className="d-flex col-12 justify-content-start align-items-center">
                  <label className="col-4 text-end">
                    <strong>Store Code: &ensp;&ensp;</strong>
                  </label>
                  <input
                    className="col-3 border border-dark"
                    type="number"
                    placeholder="##"
                    id="searchInput"
                    autoComplete="off"
                    {...register("StoreCod", {
                      required: "Store code is required",
                    })}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between my-1 col-12">
                <div className="d-flex col-12 justify-content-start align-items-center">
                  <label className="col-4 text-end">
                    <strong>Employee Code: &ensp;&ensp;</strong>
                  </label>
                  <input
                    className="col-3 border border-dark"
                    type="number"
                    placeholder="##-##-###"
                    id="searchInput"
                    autoComplete="off"
                    {...register("EmployeeCod", {
                      required: "Employee code is required",
                    })}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between my-1 col-12">
                <div className="d-flex col-12 justify-content-start align-items-center">
                  <label className="col-4 text-end">
                    <strong>Time from: &ensp;&ensp;</strong>
                  </label>
                  <input
                    className="col-3 border border-dark"
                    type="time"
                    // placeholder="##-##-###"
                    id="searchInput"
                    autoComplete="off"
                    {...register("TimeFrom", {
                      required: "Time from is required",
                    })}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between my-1 col-12">
                <div className="d-flex col-12 justify-content-start align-items-center">
                  <label className="col-4 text-end">
                    <strong>Time to: &ensp;&ensp;</strong>
                  </label>
                  <input
                    className="col-3 border border-dark"
                    type="time"
                    // placeholder="##-##-###"
                    id="searchInput"
                    autoComplete="off"
                    {...register("TimeTo", {
                      required: "Time to is required",
                    })}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between my-1 col-12">
                <div className="d-flex col-12 justify-content-start align-items-center">
                  <label className="col-4 text-end">
                    <strong>Name: &ensp;&ensp;</strong>
                  </label>
                  <input
                    className="col-7 border border-dark"
                    type="text"
                    placeholder="Type Here..."
                    id="searchInput"
                    autoComplete="off"
                    {...register("UserName", {
                      required: "Name is required",
                    })}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between my-1 col-12">
                <div className="d-flex col-12 justify-content-start align-items-center">
                  <label className="col-4 text-end">
                    <strong>Password: &ensp;&ensp;</strong>
                  </label>
                  <input
                    className="col-7 border border-dark"
                    type="text"
                    placeholder="Type Here..."
                    id="searchInput"
                    autoComplete="off"
                    {...register("Password", {
                      required: "Password is required",
                    })}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between my-1 col-12">
                <div className="d-flex col-12 justify-content-start align-items-center">
                  <label className="col-4 text-end">
                    <strong>Password expiry: &ensp;&ensp;</strong>
                  </label>
                  <input
                    className="col-3 border border-dark"
                    type="date"
                    // placeholder="Type Here..."
                    id="searchInput"
                    autoComplete="off"
                    {...register("ExpDate", {
                      required: "Expiry is required",
                    })}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between my-1 col-12">
                <div className="d-flex col-12 justify-content-start align-items-center">
                  <label className="col-4 text-end">
                    <strong>Status: &ensp;&ensp;</strong>
                  </label>
                  <select
                    className="col-3 border border-dark"
                    {...register("Status", {
                      required: "Status is required",
                    })}
                  >
                    <option value="">Select Status</option>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-between my-1 col-12">
                <div className="d-flex col-12 justify-content-start align-items-center">
                  <label className="col-4 text-end">
                    <strong>Type: &ensp;&ensp;</strong>
                  </label>
                  <select
                    className="col-3 border border-dark"
                    {...register("Type", {
                      required: "Type is required",
                    })}
                  >
                    <option value="">Select Type</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
                </div>
              </div>

              <div className="d-flex justify-content-between my-1 col-12">
                <div className="d-flex col-12 justify-content-start align-items-center">
                  <label className="col-4 text-end">
                    <strong>Mobile#: &ensp;&ensp;</strong>
                  </label>
                  <input
                    className="col-4 border border-dark"
                    type="text"
                    placeholder="Type Here..."
                    id="searchInput"
                    autoComplete="off"
                    {...register("Mobile", {
                      required: "Mobile is required",
                    })}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between my-1 col-12">
                <div className="d-flex col-12 justify-content-start align-items-center">
                  <label className="col-4 text-end">
                    <strong>Email: &ensp;&ensp;</strong>
                  </label>
                  <input
                    className="col-7 border border-dark"
                    type="text"
                    placeholder="Type Here..."
                    id="searchInput"
                    autoComplete="off"
                    {...register("Email", {
                      required: "Email is required",
                    })}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between my-1 col-12">
                <div className="d-flex col-12 justify-content-start align-items-center">
                  <label className="col-4 text-end">
                    <strong>Admin Email: &ensp;&ensp;</strong>
                  </label>
                  <input
                    className="col-7 border border-dark"
                    type="email"
                    autoComplete="off"
                    value={userEmail}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div>
              <div
                className="col-12 border-dark border-top text-center"
                style={{
                  backgroundColor: secondaryColor,
                }}
              >
                <Button type="submit" className="btnMaintenance">
                  Save
                </Button>{" "}
                <Button type="reset" className="btnMaintenance">
                  Clear
                </Button>{" "}
                {/* <Button  className="btnMaintenance">New</Button>{" "} */}
              </div>
            </div>
          </div>
        </form>
      </Container>
      <Footer />
    </>
  );
}
