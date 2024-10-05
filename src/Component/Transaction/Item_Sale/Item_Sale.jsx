import { Form } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Item_Sale.css";
import { QRCodeSVG } from "qrcode.react";
import { Modal } from "react-bootstrap"; // Assume you're using react-bootstrap for modal
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../ThemeContext";
import { fetchItem, fetchChartofAccount } from "../../Redux/action";
import Bin from "../../../image/bin.png";
import NavComponent from "../../MainComponent/Navform/navbarform";
import Footer from "../../MainComponent/Footer/Footer";
import Header from "../../MainComponent/Header/Header";
import ButtonGroupprint from "../../MainComponent/Button/ButtonGroupprint/ButtonGroupprint";
import GeneralTwoFieldsModal from "./GeneralTwoFieldsModal";
import DateInput from "../../MainComponent/DateInput/DateInput";

function Item_Sale() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const datalist = useSelector((state) => state.itemlist);
  const datalistAccount = useSelector((state) => state.accountlist);
  useEffect(() => {
    console.log(
      "datalistAccount",
      datalistAccount.data && datalistAccount.data
    );
    dispatch(fetchItem());
    dispatch(fetchChartofAccount());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchItem());
    setTimeout(() => {
      SaleNo.current.focus();
      console.log("datalistdatalistdatalistdatalist", datalist);
    }, 3000);
  }, [dispatch]);
  const SaleNo = useRef(null);
  const DATE = useRef(null);

  const CustomerCode = useRef(null);
  const CustomerName = useRef(null);
  const Remarks = useRef(null);
  const Mobile1 = useRef(null);
  const Mobile2 = useRef(null);
  const Name = useRef(null);
  const Address1 = useRef(null);
  const Address2 = useRef(null);
  const Cnic = useRef(null);
  const NTN = useRef(null);
  const STN = useRef(null);

  const Customer = useRef(null);
  const Status = useRef(null);
  const Company = useRef(null);
  const Category = useRef(null);
  const Capacity = useRef(null);
  const Type = useRef(null);
  const Purchase = useRef(null);
  const SaleMan = useRef(null);
  const MRP = useRef(null);
  const Sale = useRef(null);
  const Fix = useRef(null);
  const Submit = useRef(null);
  const lastInputRef = useRef(null);
  const SearchBox = useRef(null);
  const SearchBoxAccount = useRef(null);

  const firstRowRef = useRef(null);
  const tableRef = useRef(null);
  const [nextItemId, setNextItemId] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://crystalsolutions.com.pk/umair_electronic/web/INVNumber.php"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTimeout(() => {
          setNextItemId(data.num);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  //  create a functiion who i used in our programs
  function formatToTwoDecimal(value) {
    let formattedValue = parseFloat(value).toFixed(2);
    return formattedValue;
  }
  const removeCommas = (value) => {
    if (typeof value !== "string") {
      value = String(value);
    }
    return value.replace(/,/g, "");
  };

  function formatCode(input) {
    const cleanedInput = input.replace(/\D/g, "");

    const part1 = cleanedInput.slice(0, 2); // First 2 digits
    const part2 = cleanedInput.slice(2, 4); // Next 2 digits
    const part3 = cleanedInput.slice(4); // Last 4 digits
    return `${part1}-${part2}-${part3}`;
  }
  function formatNationalID(input) {
    const cleanedInput = input.replace(/\D/g, "");
    const part1 = cleanedInput.slice(0, 5);
    const part2 = cleanedInput.slice(5, 12);
    const part3 = cleanedInput.slice(12);
    return `${part1}-${part2}-${part3}`;
  }
  const [tableDataAccount, setTableDataAccount] = useState([]);
  const [getfrefcod, setfrefcod] = useState();
  const [getfrefcoddes, setfrefcoddesc] = useState();
  const [getsetfcstnam, setfcstnam] = useState("");
  const [getftrnrem, setftrnrem] = useState("");
  const [getfmobnum, setfmobnum] = useState("");
  const [getfadd001, setfadd001] = useState("");
  const [getfadd002, setfadd002] = useState("");
  const [getfnicnum, setfnicnum] = useState("");
  const [getfntnnum, setfntnnum] = useState("");
  const [getfstnnum, setfstnnum] = useState("");
  const [PSerNum, setPSerNum] = useState(0);
  const [dateFormate, setDateFormate] = useState("");

  useEffect(() => {
    if (Sale.current) {
      Sale.current.focus();
    }
  }, []);
  const handleInputChange3 = (e) => {
    const { name, value } = e.target;
    const upperCaseValue = value.toUpperCase();
    e.target.value = upperCaseValue;

    if (name === "CustomerCode") {
      const formattedValue = formatCode(value);
      setfrefcod(formattedValue);
      const selectedItem =
        datalistAccount.data &&
        datalistAccount.data.find((item) => item.tacccod === formattedValue);
      if (selectedItem) {
        setfrefcoddesc(selectedItem.taccdsc);
        console.log("selectedItem", selectedItem);
      } else {
        console.log("No matching item found");
        setfrefcoddesc("");
      }
    }
    if (name === "Mobile1") {
      setfmobnum(upperCaseValue);
    }
    if (name === "Remarks") {
      setftrnrem(upperCaseValue);
    }
    if (name === "Name") {
      setfcstnam(upperCaseValue);
    }

    if (name === "Address1") {
      setfadd001(upperCaseValue);
    }
    if (name === "Address2") {
      setfadd002(upperCaseValue);
    }
    if (name === "Cnic") {
      const formattedValue = formatNationalID(value);
      setfnicnum(formattedValue);
    }
    if (name === "NTN") {
      setfntnnum(upperCaseValue);
    }
    if (name === "STN") {
      setfstnnum(upperCaseValue);
    }
  };

  const [highlightedRowIndex, setHighlightedRowIndex] = useState(0);
  const generateRandomString = () => {
    const length = 10; // Length of the random string
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };
  const randomData = generateRandomString();

  const today = new Date();

  // Format the date to "dd/mm/yyyy"
  const formattedDate = today.toLocaleDateString("en-GB");
  const formattedTime = today.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use true for AM/PM format, false for 24-hour format
  });
  const [alertData, setAlertData] = useState(null);
  const { secondaryColor, apiLinks } = useTheme();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [Length, setLength] = useState("");

  const UserId = 33;

  const responseData = {
    // detail1: [],
    detail1: [],
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data to be sent in the request
      const responsedata = {
        SaleNo: "0001",
        customercode: CustomerCode.current.value,
        CustomerDescription: CustomerName.current.value,
        Date: dateFormate,
        Remarks: Remarks.current.value,
        Mobile1: Mobile1.current.value,
        Mobile2: Mobile2.current.value,
        Name: Name.current.value,
        Address1: Address1.current.value,
        Address2: Address2.current.value,
        CNIC: Cnic.current.value,
        NTN: NTN.current.value,
        STN: STN.current.value,
        totalAmount: removeCommas(totalAmount),
        totalQuantity: removeCommas(totalQuantity),
        type: "INV",

        detail1: tableData.map((item) => ({
          item_id: item.name,
          item_description: item.Description,
          item_pur: item.Purchase,
          item_sale: item.Sale,
          item_quantity: item.quantity,
          item_amount: item.Amount,
          item_MRP: item.MRP,
          item_Tax: item.Tax,
          item_TotalTax: item.TotalTax,
        })),
      };
      // const response = await axios.post(
      //   `https://crystalsolutions.com.pk/umair_electronic/web/ItemSale.php`,
      //   JSON.stringify(responsedata),
      //   {
      //     headers: { "Content-Type": "application/json" },
      //   }
      // );

      // console.log(response);
      console.log("sdfsdfsdf", responsedata);

      // if (response.data.error === 200) {
      //   // navigate("/MainPage");
      //   console.log(response.data.message);
      //   setAlertData({
      //     type: "success",
      //     message: `${response.data.message}`,
      //   });
      //   setTimeout(() => {
      //     setAlertData(null);
      //     window.location.reload();
      //   }, 1000);
      // } else {
      //   console.log(response.data.message);

      //   setAlertData({
      //     type: "error",
      //     message: `${response.data.message}`,
      //   });
      //   setTimeout(() => {
      //     setAlertData(null);
      //   }, 2000);
      // }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  const [gettotaltax, settotaltax] = useState(0);
  const calculateTotals = () => {
    let quantityTotal = 0;
    let amountTotal = 0;
    let taxTotal = 0;
    tableData.forEach((rowData) => {
      const quantity = parseFloat(rowData.quantity || 0);
      const sale = parseFloat(rowData.Sale || 0);
      const totaltx = parseFloat(rowData.TotalTax || 0);
      taxTotal += totaltx;
      quantityTotal += quantity;
      amountTotal += quantity * sale;
    });
    settotaltax(formatToTwoDecimal(taxTotal));
    setTotalQuantity(quantityTotal.toFixed(2));
    const amountWithCommas = amountTotal.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
    // Format the amount with commas using toLocaleString
    setTotalAmount(formatToTwoDecimal(amountTotal)); // Format the amount with commas
  };

  const [tableData, setTableData] = useState([
    {
      name: "",
      Description: "",
      Purchase: "",
      Sale: "",
      Amount: "",
      MRP: "",
      Tax: "",
      TotalTax: "",
      quantity: "",
    },
  ]);

  const handleInputChange = (event, index) => {
    console.log("tableData", tableData);

    const { name, value } = event.target;

    const newData = [...tableData];
    newData[index][name] = value;
    setTableData(newData);
    calculateTotals();

    // Calculate kerna hai sale or quantity ko multiply karke amount ko update karna hai
    if (name === "quantity" || name === "sale") {
      const quantity = parseFloat(newData[index].quantity || 0);
      const purchase = parseFloat(newData[index].Sale || 0);
      const amount = quantity * purchase;
      const amountWithCommas = formatToTwoDecimal(amount);
      const quantitywithCommas = formatToTwoDecimal(quantity);
      newData[index].Amount = amountWithCommas;
      newData[index].quantity = quantitywithCommas;
    }
    setTableData(newData);
  };

  const calculateAmount = (quantity, Sale) => {
    const parsedQuantity = parseFloat(quantity) || 0;
    const parsedPurchase = parseFloat(Sale) || 0;
    return parsedQuantity * parsedPurchase;
  };

  const [itemdata, setitemdata] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchTextAccount, setSearchTextAccount] = useState("");

  useEffect(() => {
    if (datalist.data && Array.isArray(datalist.data)) {
      const transformedData = datalist.data.map((item) => ({
        titmcod: item.titmcod,
        titmdsc: item.titmdsc,
        tpurrat: item.tpurrat,
        tsalrat: item.tsalrat,
        tmanrat: item.tmanrat,
        ttaxrat: item.ttaxrat,
      }));
      console.log(
        "transformedDatatransformedDatatransformedDatatransformedData",
        transformedData
      );
      setitemdata(transformedData);
      setLength(transformedData.length);
    }
  }, [datalist.data]);

  const handleSearchChange = (event) => {
    const capital = event.target.value.toUpperCase();
    setSearchText(capital);
  };

  // row ko add kerna ka lia
  const addNewRow = () => {
    setTableData([
      ...tableData,
      {
        name: "",
        Description: "",
        Purchase: "",
        Sale: "",
        Amount: "",
        MRP: "",
        Tax: "",
        TotalTax: "",
        isEditable: true,
      },
    ]);
  };

  const [getcolor, setColor] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  // modal ko open kerta hai or text ko set kerta hai search ma show kerwana ka lia
  const handleDoubleClick = (e) => {
    setTimeout(() => {
      focusNextInput(SearchBox);
    }, 500);
    console.log("====== handle double click=======");
    console.log("e.target.value", e.target.value);
    setSearchText(e.target.value);
    setModalOpen(true);
  };

  const [isModalOpenAccount, setModalOpenAccount] = useState(false);

  const handleSearchChangeAccount = (event) => {
    setHighlightedRowIndex(0);
    setTimeout(() => {
      focusNextInput(SearchBoxAccount);
    }, 500);
    const upperCaseValue = event.target.value.toUpperCase();
    setSearchTextAccount(upperCaseValue);
  };
  const handleDoubleClickAccount = (e) => {
    setTimeout(() => {
      focusNextInput(SearchBoxAccount);
    }, 500);
    const upperCaseValue = e.target.value.toUpperCase();
    console.log("====== handle double click=======");
    console.log("e.target.value", e.target.value);
    setSearchTextAccount(upperCaseValue);
    setModalOpenAccount(true);
  };
  const handleCloseModalAccount = () => {
    setModalOpenAccount(false);
  };
  // close the item list modal
  const handleCloseModal = () => {
    focusNextInput(USEREF8);
    setModalOpen(false);
  };
  const handleRowClick = (rowData, rowIndex) => {
    console.log("Row Data", rowData);
    setColor(rowData.titmcod);
    setModalOpen(false);
    const updatedTableData = [...tableData];
    updatedTableData[updatedTableData.length - 1] = {
      ...updatedTableData[updatedTableData.length - 1],
      name: rowData.titmcod,
      Description: rowData.titmdsc,
      Purchase: rowData.tpurrat,
      Sale: rowData.tsalrat,
      MRP: rowData.tmanrat,
      Tax: rowData.ttaxrat,
      TotalTax: rowData.ttaxrat,
      Amount: calculateAmount(
        updatedTableData[updatedTableData.length - 1].quantity,
        rowData.tsalrat
      ),
    };
    setTableData(updatedTableData);
    calculateTotals(); // total amount or total quantity ko calculate kerna ka lia
  };
  const handleRowClickAccount = (rowData, rowIndex) => {
    console.log("handleRowClickAccount", rowData);
    setModalOpenAccount(false);
    setfrefcod(rowData.tacccod);
    setfrefcoddesc(rowData.taccdsc);
    calculateTotals();
  };
  const handleDeleteRow = (index) => {
    const updatedTableData = [...tableData];
    const deletedRow = updatedTableData.splice(index, 1)[0];
    if (!deletedRow) {
      return;
    }
    const deletedQuantity = deletedRow.quantity || 0;
    const deletedSale = deletedRow.Sale || 0;
    const deletedTotalTax = deletedRow.TotalTax || 0;
    setTableData(updatedTableData);
    const newTotalQuantity = totalQuantity - deletedQuantity;
    const newTotalAmount =
      removeCommas(totalAmount) - deletedQuantity * deletedSale;
    const newTotalTax = gettotaltax - deletedTotalTax;
    console.log("totalAmount", newTotalAmount);
    setTotalQuantity(formatToTwoDecimal(newTotalQuantity) || "0.00");
    setTotalAmount(formatToTwoDecimal(newTotalAmount) || "0.00");
    settotaltax(formatToTwoDecimal(newTotalTax) || "0.00");
  };

  const USEREF4 = useRef(null);
  const USEREF8 = useRef(null);
  const USEREF9 = useRef(null);

  // Function to focus on the next input field
  const focusNextInput = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };
  const lastRowRef = useRef(null);

  // Focus on the last row jab hum 11 row per ho ga tu scroll ker ka last row per focus ho ga
  useEffect(() => {
    if (lastRowRef.current) {
      lastRowRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [tableData]);
  const handleEnterKeyPress = (ref, e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      focusNextInput(ref);
    }
  };
  const handleInputChange1 = (event, rowIndex) => {
    const { name, value } = event.target;
    const updatedTableData = [...tableData];
    console.log("value", value);
    if (name === "name") {
      if (!value) {
        updatedTableData[rowIndex] = {
          ...updatedTableData[rowIndex],
          name: "",
          Description: "",
          Purchase: 0,
          Sale: 0,
          MRP: 0,
          Tax: 0,
          TotalTax: 0,
          Amount: 0,
        };
      } else {
        const selectedItem = datalist.data.find(
          (item) => item.titmcod === value
        );
        console.log("selectedItem:", selectedItem);

        if (selectedItem) {
          // Update the row data based on the selected item
          updatedTableData[rowIndex] = {
            ...updatedTableData[rowIndex],
            name: selectedItem.titmcod,
            Description: selectedItem.titmdsc,
            Purchase: selectedItem.tpurrat,
            Sale: selectedItem.tsalrat,
            MRP: selectedItem.tmanrat,
            Tax: selectedItem.ttaxrat,
            TotalTax: selectedItem.ttaxrat,
            // Calculate the Amount
            Amount: calculateAmount(
              updatedTableData[rowIndex].quantity || 0,
              selectedItem.tsalrat
            ),
          };
        } else {
          updatedTableData[rowIndex] = {
            ...updatedTableData[rowIndex],
            name: value,
            Description: "",
            Purchase: 0,
            Sale: 0,
            MRP: 0,
            Tax: 0,
            TotalTax: 0,
            Amount: 0,
          };
        }
      }
    } else {
      updatedTableData[rowIndex] = {
        ...updatedTableData[rowIndex],
        [name]: value,
      };
      if (name === "quantity" || name === "Sale") {
        const quantity = parseFloat(updatedTableData[rowIndex].quantity || 0);
        const Sale = parseFloat(updatedTableData[rowIndex].Sale || 0);
        updatedTableData[rowIndex].Amount = (quantity * Sale).toFixed(2);
      }
    }
    setTableData(updatedTableData);
    calculateTotals();
  };

  const handleInputChangefetchdata = async (e) => {
    console.log("show the value is:", e.target.value);
    let inputValue = e.target.value;
    setNextItemId(inputValue);
    if (inputValue.length > 6) {
      return;
    }
  };
  const handleBlurRVC = (e) => {
    const value = String(nextItemId).padStart(6, "0");
    setNextItemId(value);
    console.log("value", value);
    setTimeout(() => {
      handleInputChangefetchdatafunction(value);
    }, 500);
  };
  const handleInputChangefetchdatafunction = (paddedValue) => {
    const data = {
      invNumber: paddedValue,
    };
    const formData = new URLSearchParams(data).toString();

    axios
      .post(
        `https://crystalsolutions.com.pk/umair_electronic/web/InvoiceList.php`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log(response.data[0], "sdjklfjs");
        const matchedItem = response.data[0];
        if (matchedItem) {
          setfrefcod(matchedItem.frefcod);
          setfrefcoddesc(matchedItem.fcstnam);
          setfcstnam(matchedItem.fcstnam);
          setftrnrem(matchedItem.ftrnrem);
          setfmobnum(matchedItem.fmobnum);
          setfadd001(matchedItem.fadd001);
          setfadd002(matchedItem.fadd002);
          setfnicnum(matchedItem.fnicnum);
          setfntnnum(matchedItem.fntnnum);
          setfstnnum(matchedItem.fstnnum);

          if (matchedItem.detail && matchedItem.detail.length > 0) {
            const newTableData = matchedItem.detail.map((detail) => ({
              name: detail.fitmcod,
              Description: detail.ftrndsc,
              Purchase: detail.fpurrat,
              Sale: detail.fsalrat,
              Amount: detail.fdbtamt,
              MRP: detail.fpurrat,
              Tax: detail.ftaxrat,
              TotalTax: detail.ftaxamt,
              quantity: detail.fitmqnt,
            }));
            setTableData(newTableData);
            console.log("Matched Item:", matchedItem.ftrnrem);
            console.log("New Table Data:", newTableData);
          } else {
            setTableData([
              {
                name: "",
                Description: "",
                Purchase: "",
                Sale: "",
                Amount: "",
                MRP: "",
                Tax: "",
                TotalTax: "",
                quantity: "",
              },
            ]);
          }
        } else {
          console.log("No matching item found");
          setfrefcod("");
          setfrefcoddesc("");
          setfcstnam("");
          setftrnrem("");
          setfmobnum("");
          setfadd001("");
          setfadd002("");
          setfnicnum("");
          setfntnnum("");
          setfstnnum("");
          setTableData([
            {
              name: "",
              Description: "",
              Purchase: "",
              Sale: "",
              Amount: "",
              MRP: "",
              Tax: "",
              TotalTax: "",
              quantity: "",
            },
          ]);
        }
      });
  };

  const firstColWidth = "5%";
  const secondColWidth = "11%";
  const thirdColWidth = " 23%";
  const fourthColWidth = "9%";
  const fifthColWidth = "9%";
  const sixthColWidth = "5%";
  const seventhColWidth = "9%";
  const eightColWidth = "9%";
  const ningthColWidth = "5%";
  const tenthColWidth = "10%";
  const eleventhColWidth = "5%";
  const handleNavigation = (e, rowIndex, colIndex) => {
    const totalCols = 5; // Update this if you have a different number of columns
    const currentInput = e.target;
    let nextInput;

    switch (e.key) {
      case "ArrowUp":
        nextInput = document.querySelector(
          `input[data-row-index="${
            rowIndex - 1
          }"][data-col-index="${colIndex}"]`
        );
        break;
      case "ArrowDown":
        nextInput = document.querySelector(
          `input[data-row-index="${
            rowIndex + 1
          }"][data-col-index="${colIndex}"]`
        );
        break;
      case "ArrowLeft":
        nextInput = document.querySelector(
          `input[data-row-index="${rowIndex}"][data-col-index="${
            colIndex - 1
          }"]`
        );
        break;
      case "ArrowRight":
        nextInput = document.querySelector(
          `input[data-row-index="${rowIndex}"][data-col-index="${
            colIndex + 1
          }"]`
        );
        break;
      default:
        return;
    }

    if (nextInput) {
      nextInput.focus();
    }
  };

  const handleSave = () => {
    handleFormSubmit();
  };
  const handleClear = () => {
    // newcode();

    // Set focus to the input element with ref 'Code'
    if (Sale.current) {
      Sale.current.focus();
    }
  };
  const handlePrint = () => {
    window.print();
  };
  const handleFocus = (codeparam) => {
    if (codeparam.current) {
      codeparam.current.style.backgroundColor = "orange";
    }
  };
  function handleReturn() {
    navigate("/MainPage");
  }

  const handleBlur = (codeparam) => {
    if (codeparam.current) {
      codeparam.current.style.backgroundColor = "#3368B5";
    }
  };
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
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
              zIndex: 1000,
              textAlign: "center",
            }}
          >
            {alertData.message}
          </Alert>
        )}

        <div
          className="col-12"
          style={{
            backgroundColor: "white",
            color: "black",
            fontWeight: "bold",
            fontFamily: "Verdana",
          }}
        >
          <div
            className="row"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // padding: "5px",
              minHeight: "100vh",
              overflowY: "scroll",
              height: "calc(100vh - 200px)",
            }}
          >
            <Header />

            <div className="col-md-12 form-itemsale-container">
              <NavComponent textdata="Item Sale" />

              <Form onSubmit={handleFormSubmit} style={{ marginTop: "1%" }}>
                <div className="row ">
                  <div className="col-7">
                    <div className="row">
                      <div className="col-sm-2 label-item">SALE #:</div>
                      <div className="col-sm-3">
                        <Form.Control
                          type="number"
                          id="nextItemId"
                          placeholder="Code"
                          name="nextItemId"
                          className="form-control-item"
                          value={nextItemId}
                          ref={SaleNo}
                          onFocus={(e) => e.target.select()}
                          // onBlur={handleBlurRVC}
                          style={{ width: "90px" }}
                          onChange={(e) => handleInputChangefetchdata(e)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleBlurRVC();
                              handleEnterKeyPress(DATE, e);
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-item">Customer:</div>
                      <div className="col-sm-8" style={{ display: "flex" }}>
                        <Form.Control
                          type="text"
                          id="CustomerCode"
                          placeholder="Code"
                          name="CustomerCode"
                          className="form-control-item"
                          ref={CustomerCode}
                          value={getfrefcod}
                          style={{ width: "100px" }}
                          onChange={handleInputChange3}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              const upperCaseValue =
                                e.target.value.toUpperCase();
                              const selectedItem =
                                datalistAccount.data &&
                                datalistAccount.data.find(
                                  (item) => item.tacccod === upperCaseValue
                                );

                              if (selectedItem) {
                                console.log("selectedItem:", selectedItem);
                                handleEnterKeyPress(CustomerName, e);
                              } else if (upperCaseValue.length < 10) {
                                setAlertData({
                                  type: "error",
                                  message: `Please enter a valid account code`,
                                });
                                setTimeout(() => {
                                  setAlertData(null);
                                }, 3000);
                              } else {
                                handleEnterKeyPress(CustomerName, e);
                              }
                            }
                          }}
                          onFocus={(e) => e.target.select()}
                          onDoubleClick={(e) => {
                            if (e.target.value.length <= 10) {
                              handleDoubleClickAccount(e);
                              setTimeout(() => {
                                focusNextInput(SearchBoxAccount);
                              }, 100);
                            }
                          }}
                        />
                        <Form.Control
                          type="text"
                          id="CustomerName"
                          placeholder="Customer"
                          name="CustomerName"
                          className="form-control-item"
                          ref={CustomerName}
                          onFocus={(e) => e.target.select()}
                          value={getfrefcoddes}
                          // style={{ width: "700px" }}
                          onChange={handleInputChange3}
                          onKeyDown={(e) => handleEnterKeyPress(Remarks, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-item">Remarks:</div>
                      <div className="col-sm-8" style={{ display: "flex" }}>
                        <Form.Control
                          id="Remarks"
                          placeholder="Remarks"
                          name="Remarks"
                          className="form-control-item"
                          ref={Remarks}
                          onFocus={(e) => e.target.select()}
                          value={getftrnrem}
                          onChange={handleInputChange3}
                          onKeyDown={(e) => handleEnterKeyPress(Mobile1, e)} // Adjust as needed
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-item">Mobile:</div>
                      <div className="col-sm-8" style={{ display: "flex" }}>
                        <Form.Control
                          type="text"
                          id="Mobile1"
                          placeholder="Mobile"
                          name="Mobile1"
                          className="form-control-item"
                          ref={Mobile1}
                          maxLength={11}
                          value={getfmobnum}
                          onFocus={(e) => e.target.select()}
                          style={{ width: "150px" }}
                          onChange={handleInputChange3}
                          onKeyDown={(e) => handleEnterKeyPress(Mobile2, e)}
                        />
                        <Form.Control
                          type="text"
                          id="Mobile2"
                          placeholder="Mobile"
                          name="Mobile2"
                          className="form-control-item"
                          ref={Mobile2}
                          maxLength={11}
                          onFocus={(e) => e.target.select()}
                          style={{ width: "150px" }}
                          onChange={handleInputChange3}
                          onKeyDown={(e) => handleEnterKeyPress(Name, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-item">Name:</div>
                      <div className="col-sm-10" style={{ display: "flex" }}>
                        <Form.Control
                          type="text"
                          id="Name"
                          placeholder="Name"
                          name="Name"
                          onFocus={(e) => e.target.select()}
                          className="form-control-item"
                          ref={Name}
                          value={getsetfcstnam}
                          // style={{ height: "22px"}}
                          onChange={handleInputChange3}
                          onKeyDown={(e) => handleEnterKeyPress(Address1, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-item">Address:</div>
                      <div className="col-sm-10" style={{ display: "flex" }}>
                        <Form.Control
                          type="text"
                          id="Address1"
                          placeholder="Address1"
                          name="Address1"
                          onFocus={(e) => e.target.select()}
                          className="form-control-item"
                          ref={Address1}
                          value={getfadd001}
                          // style={{ height: "22px"}}

                          onChange={handleInputChange3}
                          onKeyDown={(e) => handleEnterKeyPress(Address2, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-item"></div>
                      <div className="col-sm-10" style={{ display: "flex" }}>
                        <Form.Control
                          type="text"
                          onFocus={(e) => e.target.select()}
                          id="Address2"
                          placeholder="Address2"
                          name="Address2"
                          className="form-control-item"
                          ref={Address2}
                          value={getfadd002}
                          // style={{ height: "22px"}}

                          onChange={handleInputChange3}
                          onKeyDown={(e) => handleEnterKeyPress(Cnic, e)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-2 label-item">CNIC:</div>
                      <div className="col-sm-5" style={{ display: "flex" }}>
                        <Form.Control
                          type="text"
                          id="Cnic"
                          onFocus={(e) => e.target.select()}
                          placeholder="CNIC"
                          name="Cnic"
                          className="form-control-item"
                          ref={Cnic}
                          maxLength={15}
                          value={getfnicnum}
                          onChange={handleInputChange3}
                          onKeyDown={(e) => handleEnterKeyPress(NTN, e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="row">
                      <div className="col-7">
                        <div className="row">
                          <QRCodeSVG value={randomData} size={110} />
                        </div>
                        <div className="row">
                          <div className="col-sm-2"></div>
                          <div className="col-sm-10">
                            <Form.Control
                              type="text"
                              id="Customer"
                              placeholder=""
                              name="Customer"
                              className="form-control-item"
                              ref={Customer}
                              onChange={handleInputChange3}
                              onKeyDown={(e) => handleEnterKeyPress(Company, e)}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-2 label-item">NTN:</div>
                          <div
                            className="col-sm-10"
                            style={{ display: "flex" }}
                          >
                            <Form.Control
                              type="text"
                              id="NTN"
                              placeholder="NTN"
                              onFocus={(e) => e.target.select()}
                              name="NTN"
                              className="form-control-item"
                              ref={NTN}
                              value={getfntnnum}
                              // style={{width:'170px'}}
                              onChange={handleInputChange3}
                              onKeyDown={(e) => handleEnterKeyPress(STN, e)}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-2 label-item">STN:</div>
                          <div
                            className="col-sm-10"
                            style={{ display: "flex" }}
                          >
                            <Form.Control
                              type="text"
                              id="STN"
                              placeholder="NTN/STN"
                              name="STN"
                              className="form-control-item"
                              onFocus={(e) => e.target.select()}
                              ref={STN}
                              value={getfstnnum}
                              // style={{width:'175px'}}

                              onChange={handleInputChange3}
                              onKeyDown={(e) => handleEnterKeyPress(USEREF4, e)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-5">
                        <div className="row">
                          <div className="col-sm-2 label-item">Date:</div>
                          <div
                            className="col-sm-10"
                            style={{ display: "flex" }}
                          >
                            <DateInput
                              dateValue={dateFormate}
                              setDateValue={setDateFormate}
                              handleEnterKeyPress={handleEnterKeyPress}
                              nextRef={CustomerCode}
                              inputRef={DATE}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-2 label-item">Time:</div>
                          <div
                            className="col-sm-10"
                            style={{ display: "flex" }}
                          >
                            <Form.Control
                              type="text"
                              id="code"
                              placeholder="Time"
                              disabled
                              className="form-control-item"
                              value={formattedTime}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col-12 firsttable-container"
                    style={{ height: "272px", fontSize: "11px" }}
                  >
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th
                            class="sticky-header"
                            style={{
                              width: firstColWidth,
                              fontSize: "11px",
                              fontWeight: "bold",
                              borderRight: "1px solid black",

                              textAlign: "center",
                            }}
                          >
                            Sr#
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              width: secondColWidth,
                              textAlign: "center",

                              fontWeight: "bold",
                              fontSize: "11px",
                              borderRight: "1px solid black",
                            }}
                          >
                            Item Code
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              width: thirdColWidth,
                              fontWeight: "bold",
                              textAlign: "center",
                              fontSize: "11px",
                              borderRight: "1px solid black",
                            }}
                          >
                            Description
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              width: fourthColWidth,
                              fontWeight: "bold",
                              textAlign: "center",
                              fontSize: "11px",
                              borderRight: "1px solid black",
                            }}
                          >
                            Purchase
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              width: fifthColWidth,
                              fontWeight: "bold",
                              textAlign: "center",
                              fontSize: "11px",
                              borderRight: "1px solid black",
                            }}
                          >
                            Sale
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              width: sixthColWidth,
                              textAlign: "center",
                              fontWeight: "bold",
                              fontSize: "11px",
                              borderRight: "1px solid black",
                            }}
                          >
                            Qnty
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              width: seventhColWidth,
                              textAlign: "center",
                              fontWeight: "bold",
                              fontSize: "11px",
                              borderRight: "1px solid black",
                            }}
                          >
                            Amount
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              width: eightColWidth,
                              textAlign: "center",
                              fontWeight: "bold",
                              fontSize: "11px",
                              color: "red",
                              borderRight: "1px solid black",
                            }}
                          >
                            MRP
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              width: ningthColWidth,
                              textAlign: "center",
                              fontWeight: "bold",
                              fontSize: "11px",
                              borderRight: "1px solid black",
                            }}
                          >
                            Tax%
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              textAlign: "center",
                              width: tenthColWidth,
                              fontWeight: "bold",
                              fontSize: "11px",
                              borderRight: "1px solid black",
                            }}
                          >
                            Total Tax
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              textAlign: "center",
                              width: eleventhColWidth,
                              fontWeight: "bold",
                              fontSize: "11px",
                              borderRight: "1px solid black",
                            }}
                          >
                            -
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((rowData, index) => (
                          <tr
                            key={index}
                            ref={
                              index === tableData.length - 1 ? lastRowRef : null
                            }
                          >
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                textAlign: "center",
                                width: firstColWidth,
                              }}
                            >
                              {index + 1}
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                textAlign: "center",
                                width: secondColWidth,
                              }}
                            >
                              <input
                                type="text"
                                name="name"
                                // placeholder="Code"
                                value={rowData.name}
                                onFocus={(e) => e.target.select()}
                                data-row-index={index}
                                data-col-index={1}
                                onChange={(e) => handleInputChange1(e, index)}
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "left",
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    if (PSerNum !== index) {
                                      setTimeout(() => {
                                        document
                                          .querySelector(
                                            `input[data-row-index="${index}"][data-col-index="9"]`
                                          )
                                          .focus();
                                      }, 10);
                                      handleEnterKeyPress(USEREF8, e);
                                    }

                                    if (rowData.name.length >= 2) {
                                      console.log("create row ======", PSerNum);

                                      handleEnterKeyPress(USEREF8, e);
                                    } else {
                                      handleDoubleClick(e);
                                    }
                                  } else {
                                    handleNavigation(e, index, 1);
                                  }
                                }}
                                ref={USEREF4}
                                // ref={index === tableData.length - 1 ? lastInputRef : null}
                              />
                            </td>

                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                textAlign: "center",
                                width: thirdColWidth,
                              }}
                            >
                              <input
                                type="text"
                                name="Desctiption"
                                // placeholder="Description"
                                value={rowData.Description}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => handleInputChange1(e, index)}
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "left",
                                }}
                                data-row-index={index}
                                data-col-index={2}
                                onKeyDown={(e) => handleNavigation(e, index, 2)}
                              />
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                textAlign: "center",
                                width: fifthColWidth,
                              }}
                            >
                              <input
                                type="text"
                                name="Purchase"
                                // placeholder="Purchase"
                                value={rowData.Purchase}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => handleInputChange1(e, index)}
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "right",
                                }}
                                data-row-index={index}
                                data-col-index={3}
                                onKeyDown={(e) => handleNavigation(e, index, 3)}
                              />
                            </td>

                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                width: fifthColWidth,

                                textAlign: "center",
                                // background: "#f5f5f5",
                              }}
                            >
                              <input
                                type="text"
                                name="Sale"
                                // placeholder="Sale"
                                value={rowData.Sale}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => handleInputChange1(e, index)}
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "right",
                                }}
                                data-row-index={index}
                                data-col-index={4}
                                onKeyDown={(e) => handleNavigation(e, index, 4)}
                              />
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                width: sixthColWidth,
                                textAlign: "center",
                              }}
                            >
                              <input
                                name="quantity"
                                value={rowData.quantity}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => handleInputChange(e, index)}
                                ref={USEREF8}
                                data-row-index={index}
                                data-col-index={5}
                                onKeyDown={(e) => {
                                  handleNavigation(e, index, 5);

                                  const inputValue = parseFloat(e.target.value);
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    // addNewRow();
                                    // setTimeout(() => {
                                    handleEnterKeyPress(USEREF9, e);
                                    //   if (lastInputRef.current) {
                                    //     lastInputRef.current.focus();
                                    //   }
                                    // }, 500);
                                  }
                                }}
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "right",
                                }}
                              />
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                width: seventhColWidth,

                                textAlign: "center",
                                // background: "#f5f5f5",
                              }}
                            >
                              <input
                                type="text"
                                name="Amount"
                                value={rowData.Amount}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => handleInputChange(e, index)}
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "right",
                                }}
                                data-row-index={index}
                                data-col-index={6}
                                onKeyDown={(e) => handleNavigation(e, index, 6)}
                                ref={USEREF9}
                              />
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                textAlign: "center",
                                width: eightColWidth,
                              }}
                            >
                              <input
                                type="text"
                                name="Purchase"
                                // placeholder="Purchase"
                                value={rowData.Purchase}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => handleInputChange1(e, index)}
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "right",
                                }}
                                data-row-index={index}
                                data-col-index={7}
                                onKeyDown={(e) => handleNavigation(e, index, 7)}
                              />
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                textAlign: "center",
                                width: ningthColWidth,
                              }}
                            >
                              <input
                                type="text"
                                name="tatPersentage"
                                // placeholder="Percentage"
                                value={rowData.Tax}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => handleInputChange1(e, index)}
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "right",
                                }}
                                data-row-index={index}
                                data-col-index={8}
                                onKeyDown={(e) => handleNavigation(e, index, 8)}
                              />
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                textAlign: "center",
                                width: tenthColWidth,
                              }}
                            >
                              <input
                                type="text"
                                name="Tax"
                                // placeholder="Tax"
                                value={rowData.TotalTax}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => handleInputChange1(e, index)}
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "right",
                                }}
                                ref={USEREF9}
                                data-row-index={index}
                                data-col-index={9}
                                onKeyDown={(e) => {
                                  handleNavigation(e, index, 9);
                                  const inputValue = parseFloat(e.target.value);

                                  if (e.key === "Enter" && inputValue > 0) {
                                    e.preventDefault();

                                    if (
                                      rowData.name.length >= 2 &&
                                      rowData.Description.length > 2 &&
                                      rowData.quantity > 0 &&
                                      rowData.quantity !== 0 &&
                                      PSerNum === index
                                    ) {
                                      console.log("create row ======", PSerNum);
                                      addNewRow();
                                      setPSerNum(PSerNum + 1);

                                      setTimeout(() => {
                                        handleEnterKeyPress(USEREF4, e);

                                        if (lastInputRef.current) {
                                          lastInputRef.current.focus();
                                        }
                                      }, 500);
                                    } else {
                                      console.log(
                                        "PSerNum no add row",
                                        PSerNum,
                                        index
                                      );
                                      handleEnterKeyPress(USEREF4, e);
                                      setTimeout(() => {
                                        document
                                          .querySelector(
                                            `input[data-row-index="${index}"][data-col-index="1"]`
                                          )
                                          .focus();
                                      }, 10);
                                    }
                                  }
                                }}
                              />
                            </td>
                            {tableData.length - 1 ? (
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                  // background: "#f5f5f5",
                                  width: eleventhColWidth,
                                }}
                              >
                                <img
                                  onClick={() => handleDeleteRow(index)} // Delete the row when the delete icon is clicked
                                  src={Bin}
                                  alt="delete"
                                  style={{
                                    cursor: "pointer",
                                    width: "18px",
                                    height: "auto",
                                  }}
                                />
                              </td>
                            ) : (
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                  // background: "#f5f5f5",
                                  width: eleventhColWidth,
                                }}
                              >
                                <img
                                  src={Bin}
                                  alt="delete"
                                  disabled
                                  style={{
                                    cursor: "pointer",
                                    width: "18px",
                                    height: "auto",
                                  }}
                                />
                              </td>
                            )}
                          </tr>
                        ))}
                        {Array.from({
                          length: Math.max(0, 10 - tableData.length),
                        }).map((_, index) => (
                          <tr key={`blank-${index}`}>
                            {Array.from({ length: 11 }).map((_, colIndex) => (
                              <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>

                      <tfoot>
                        <tr
                          style={{
                            backgroundColor: "#c6daf7",
                            borderTop: "1px solid black",
                          }}
                        >
                          <td
                            style={{
                              width: firstColWidth,
                            }}
                          ></td>
                          <td
                            style={{
                              width: secondColWidth,
                            }}
                          ></td>
                          <td
                            style={{
                              width: thirdColWidth,
                            }}
                          ></td>
                          <td
                            style={{
                              width: fourthColWidth,
                            }}
                          ></td>

                          <td
                            style={{
                              width: fifthColWidth,
                            }}
                          ></td>
                          <td
                            style={{
                              border: "1px solid #000",
                              padding: "8px",
                              width: sixthColWidth,

                              textAlign: "right",
                            }}
                          >
                            {totalQuantity || ".00"}
                          </td>
                          <td
                            style={{
                              border: "1px solid #000",
                              padding: "8px",
                              width: seventhColWidth,

                              textAlign: "right",
                            }}
                          >
                            {totalAmount || ".00"}
                          </td>
                          <td
                            style={{
                              border: "1px solid #000",
                              padding: "8px",
                              width: eightColWidth,

                              textAlign: "center",
                            }}
                          >
                            <input
                              style={{
                                width: "100%",
                                border: "none",
                                backgroundColor: "transparent",
                                textAlign: "center",
                              }}
                            />
                          </td>
                          <td
                            style={{
                              border: "1px solid #000",
                              padding: "8px",
                              width: ningthColWidth,

                              textAlign: "center",
                            }}
                          ></td>
                          <td
                            style={{
                              border: "1px solid black",
                              borderRight: "1px solid black",
                              padding: "8px",
                              width: tenthColWidth,

                              textAlign: "right",
                            }}
                          >
                            {gettotaltax || ".00"}
                          </td>
                          <td
                            style={{
                              width: eleventhColWidth,
                            }}
                          ></td>
                        </tr>
                      </tfoot>
                    </table>
                    <ButtonGroupprint
                      Submit={Submit}
                      handleFocus={handleFocus}
                      handleBlur={handleBlur}
                      handleSave={handleSave}
                      handleReturn={handleReturn}
                      handleClear={handleClear}
                      handlePrint={handlePrint}
                      handleFormSubmit={handleFormSubmit}
                    />
                  </div>
                  <GeneralTwoFieldsModal
                    isOpen={isModalOpenAccount}
                    handleClose={handleCloseModalAccount}
                    title="Select Account"
                    technicians={datalistAccount.data}
                    searchRef={SearchBoxAccount}
                    handleRowClick={handleRowClickAccount}
                    firstColKey="tacccod"
                    secondColKey="taccdsc"
                  />
                  <GeneralTwoFieldsModal
                    isOpen={isModalOpen}
                    handleClose={handleCloseModal}
                    title="Select Item"
                    technicians={itemdata}
                    searchRef={SearchBox}
                    handleRowClick={handleRowClick}
                    firstColKey="titmcod"
                    secondColKey="titmdsc"
                  />
                </div>
              </Form>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Item_Sale;
