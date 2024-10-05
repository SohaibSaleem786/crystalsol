import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { Form, Button, Container, Nav } from "react-bootstrap";
import Header from "../../../MainComponent/Header/Header";
import Footer from "../../../MainComponent/Footer/Footer";
// import { Content } from "../../../../App";

const EditUser = () => {
  const navigate = useNavigate();
  const { tusrid } = useParams();
  const [alertData, setAlertData] = useState(null);
  const [userId, setUserId] = useState("");
  const tableTopColor = "#3368B5";
  const tableHeadColor = "#3368B5";
  const secondaryColor = "white";
  const btnColor = "#3368B5";
  const textColor = "white";
  const [userEmail, setUserEmail] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserEmail(user.temladd);
      setUserId(user.id);
      // console.log(user.id, "abcdefghijklmnopqrstuvwxyz");
    }
  }, []);

  useEffect(() => {
    fetch(
      `https://crystalsolutions.com.pk/american_lec/web/utilties/UserList.php`
    )
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.tusrid === tusrid);
        console.log(user, "ilu");
        setUser(user || {}); // Ensure user is an object
      })
      .catch((error) => console.error(error));
  }, [tusrid]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (data) => {
    data.preventDefault();
    console.log(data);

    fetch(
      `https://crystalsolutions.com.pk/american_lec/web/utilties/update_user.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
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
        }).toString(),
      }
    )
      .then((response) => console.log(response.json()))
      .then((data) => {
        if (data.error === 200) {
          setAlertData({
            type: "success",
            message: data.message,
          });
          setTimeout(() => {
            setAlertData(null);
            navigate("/usermanagement");
          }, 3000);
        } else {
          setAlertData({
            type: "error",
            message: data.message,
          });
          setTimeout(() => {
            setAlertData(null);
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
      <Header />
      <Container
        className="border border-dark"
        id="ContainerStylingLocationMaintenance"
      >
        <form onSubmit={handleSubmit}>
          <div style={{ margin: "0 -12px" }}>
            <Nav
              className="col-12 d-flex justify-content-between"
              style={{ backgroundColor: tableTopColor, color: textColor }}
            >
              <div className="col-2"></div>
              <div style={{ fontSize: "14px" }} className="col-8 text-center">
                <strong>Edit User</strong>
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
                    id="searchInput"
                    autoComplete="off"
                    name="UsrId"
                    defaultValue={user.tusrid}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between my-1 col-12">
                <div className="d-flex col-12 justify-content-start align-items-center">
                  <label className="col-4 text-end">
                    <strong>Cash code: &ensp;&ensp;</strong>
                  </label>
                  <input
                    className="col-3 border border-dark"
                    type="text"
                    id="searchInput"
                    autoComplete="off"
                    name="CashCod"
                    defaultValue={user.tcashcod}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between my-1 col-12">
                <div className="d-flex col-12 justify-content-start align-items-center">
                  <label className="col-4 text-end">
                    <strong>Store code: &ensp;&ensp;</strong>
                  </label>
                  <input
                    className="col-3 border border-dark"
                    type="text"
                    id="searchInput"
                    autoComplete="off"
                    name="StoreCod"
                    defaultValue={user.tstrcod}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between my-1 col-12">
                <div className="d-flex col-12 justify-content-start align-items-center">
                  <label className="col-4 text-end">
                    <strong>Employee code: &ensp;&ensp;</strong>
                  </label>
                  <input
                    className="col-3 border border-dark"
                    type="text"
                    id="searchInput"
                    autoComplete="off"
                    name="EmployeeCod"
                    defaultValue={user.tempcod}
                    onChange={handleInputChange}
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
                    id="searchInput"
                    autoComplete="off"
                    name="TimeFrom"
                    defaultValue={user.tttimefrm}
                    onChange={handleInputChange}
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
                    id="searchInput"
                    autoComplete="off"
                    name="TimeTo"
                    defaultValue={user.ttimeto}
                    onChange={handleInputChange}
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
                    id="searchInput"
                    autoComplete="off"
                    name="UserName"
                    defaultValue={user.tusrnam}
                    onChange={handleInputChange}
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
                    id="searchInput"
                    autoComplete="off"
                    name="Password"
                    defaultValue={user.tusrpwd}
                    onChange={handleInputChange}
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
                    id="searchInput"
                    autoComplete="off"
                    name="ExpDate"
                    defaultValue={user.tpassexpir}
                    onChange={handleInputChange}
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
                    value={user.tusrsts}
                    name="Status"
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
                    value={user.tusrtyp}
                    name="Type"
                  >
                    <option value="">Select type</option>
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
                    className="col-3 border border-dark"
                    type="text"
                    id="searchInput"
                    autoComplete="off"
                    name="Mobile"
                    defaultValue={user.tmobnum}
                    onChange={handleInputChange}
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
                    type="email"
                    id="searchInput"
                    autoComplete="off"
                    name="Email"
                    defaultValue={user.temladd}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between my-1 col-12">
                <div className="d-flex col-12 justify-content-start align-items-center">
                  <label className="col-4 text-end">
                    <strong>Admin email: &ensp;&ensp;</strong>
                  </label>
                  <input
                    className="col-7 border border-dark"
                    type="email"
                    id="searchInput"
                    autoComplete="off"
                    defaultValue={user.tadmineml}
                    onChange={handleInputChange}
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
};

export default EditUser;
