import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Nav,
  Spinner,
} from "react-bootstrap";
import { MDBTable, MDBTableBody, MDBTableFoot, MDBTableHead } from "mdbreact";

import Alert from "@mui/material/Alert";
import PathHead from "../../MainComponent/PathHead/PathHead";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Item_Purchase.css";
import { QRCodeSVG } from "qrcode.react";
import { Modal } from "react-bootstrap"; // Assume you're using react-bootstrap for modal
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../ThemeContext";
import { fetchItem, fetchChartofAccount } from "../../Redux/action";
import Bin from "../../../image/bin.png";
import GeneralModal from "./Item_Purchase_Model";
import ButtonGroupp from "../../MainComponent/Button/ButtonGroup/ButtonGroup";
import NavComponent from "../../MainComponent/Navform/navbarform";
import Footer from "../../MainComponent/Footer/Footer";
import Header from "../../MainComponent/Header/Header";
import ButtonGroupprint from "../../MainComponent/Button/ButtonGroupprint/ButtonGroupprint";

function Item_Purchase() {
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
  const RefDo = useRef(null);
  const GST = useRef(null);
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
  function removeCommas(amount) {
    return parseFloat(amount.replace(/,/g, ""));
  }

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
  const [getRefDo, setRefDo] = useState("");
  const [getGST, setGST] = useState("");
  const [PSerNum, setPSerNum] = useState(0);
  const [dateFormate, setDateFormate] = useState("");
  useEffect(() => {
    if (Sale.current) {
      Sale.current.focus();
    }
    // Function to format the date as yyyy-mm-dd
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    // Initialize getdate with today's date in yyyy-mm-dd format
    const today = new Date();
    setDateFormate(formatDate(today));
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
    if (name === "RefDo") {
      setRefDo(upperCaseValue);
    }
    if (name === "GST") {
      setGST(upperCaseValue);
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
        Saleid: "0001",
        Suppliercode: CustomerCode.current.value,
        SupplierDescription: CustomerName.current.value,
        NTN: NTN.current.value,
        STRN: STN.current.value,
        Address1: Address1.current.value,
        Address2: Address2.current.value,
        Remarks: Remarks.current.value,
        RefDo: RefDo.current.value,
        GST: GST.current.value,
        totalAmount: removeCommas(totalAmount),
        totalQuantity: removeCommas(totalQuantity),
        totalAdvtax: removeCommas(getAdvIt),
        totalDisctax: removeCommas(getDisc),
        totalTax: removeCommas(gettotaltax),
        totalFux: removeCommas(getfuxtax),
        type: "PUR",

        detail1: tableData.map((item) => ({
          item_id: item.name,
          item_description: item.Description,
          item_quantity: item.quantity,
          item_pur: item.Purchase,
          item_amount: item.Amount.replace(/,/g, ""),
          item_retail: item.RetailRate,
          item_tax: item.Tax,
          item_totalTax: item.TotalTax,
          item_fux: item.FurTax,
          item_disc: item.Disc,
          item_advIt: item.AdvIt,
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

  // yha per hum sari calculations ker rha hai
  const calculateTotals = () => {
    let quantityTotal = 0;
    let amountTotal = 0;
    let taxTotal = 0;
    let TotalAdvt = 0;
    let TotalDisc = 0;
    let Totalfux = 0;
    tableData.forEach((rowData) => {
      const quantity = parseFloat(rowData.quantity || 0);
      const purchase = parseFloat(rowData.Purchase || 0);
      const totaltx = parseFloat(rowData.TotalTax || 0);
      const totalAdvt = parseFloat(rowData.AdvIt || 0);
      const totalDisc = parseFloat(rowData.Disc || 0);
      const totalfux = parseFloat(rowData.FurTax || 0);
      taxTotal += totaltx;
      quantityTotal += quantity;
      amountTotal += quantity * purchase;
      TotalAdvt += totalAdvt;
      TotalDisc += totalDisc;
      Totalfux += totalfux;
    });
    setAdvIt(formatToTwoDecimal(TotalAdvt));
    setDisc(formatToTwoDecimal(TotalDisc));
    setfuxtax(formatToTwoDecimal(Totalfux));
    settotaltax(formatToTwoDecimal(taxTotal));
    setTotalQuantity(formatToTwoDecimal(quantityTotal));
    setTotalAmount(formatToTwoDecimal(amountTotal));
  };

  const [tableData, setTableData] = useState([
    {
      name: "",
      Description: "",
      quantity: "",
      Purchase: "",
      Amount: "",
      RetailRate: "",
      Tax: "",
      TotalTax: "",
      FurTax: "",
      Disc: "",
      AdvIt: "",
    },
  ]);
  const [getfuxtax, setfuxtax] = useState(0);
  const [getDisc, setDisc] = useState(0);
  const [getAdvIt, setAdvIt] = useState(0);
  const handleInputChange = (event, index) => {
    console.log("tableData", tableData);

    const { name, value } = event.target;

    const newData = [...tableData];
    newData[index][name] = value;
    setTableData(newData);
    calculateTotals();

    // Calculate kerna hai sale or quantity ko multiply karke amount ko update karna hai
    if (name === "quantity" || name === "purchase") {
      const quantity = parseFloat(newData[index].quantity || 0);
      const purchase = parseFloat(newData[index].Purchase || 0);
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
        quantity: "",
        Purchase: "",
        Amount: "",
        RetailRate: "",
        Tax: "",
        TotalTax: "",
        FurTax: "",
        Disc: "",
        AdvIt: "",
        iseditable: true,
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
    const deletedSale = deletedRow.Purchase || 0;
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
          quantity: "",
          Purchase: 0,
          Amount: 0,
          RetailRate: 0,
          Tax: 0,
          TotalTax: 0,
          FurTax: 0,
          Disc: 0,
          AdvIt: 0,
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
            Tax: selectedItem.ttaxrat,
            TotalTax: selectedItem.ttaxrat,
            // Calculate the Amount
            Amount: calculateAmount(
              updatedTableData[rowIndex].quantity || 0,
              selectedItem.tpurrat
            ),
          };
        } else {
          updatedTableData[rowIndex] = {
            ...updatedTableData[rowIndex],
            name: value,
            Description: "",
            quantity: "",
            Purchase: 0,
            Amount: 0,
            RetailRate: 0,
            Tax: 0,
            TotalTax: 0,
            FurTax: 0,
            Disc: 0,
            AdvIt: 0,
          };
        }
      }
    } else {
      updatedTableData[rowIndex] = {
        ...updatedTableData[rowIndex],
        [name]: value,
      };
      if (name === "quantity" || name === "Purchase") {
        const quantity = parseFloat(updatedTableData[rowIndex].quantity || 0);
        const Purchase = parseFloat(updatedTableData[rowIndex].Purchase || 0);
        updatedTableData[rowIndex].Amount = (quantity * Purchase).toFixed(2);
      }
    }
    setTableData(updatedTableData);
    calculateTotals();
  };
  const filteredRows = itemdata.filter(
    (row) =>
      (row.titmcod &&
        row.titmcod.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.titmdsc &&
        row.titmdsc.toLowerCase().includes(searchText.toLowerCase()))
  );
  const filteredRowsAccount =
    datalistAccount.data &&
    datalistAccount.data.filter(
      (row) =>
        (row.tacccod &&
          row.tacccod
            .toLowerCase()
            .includes(searchTextAccount.toLowerCase())) ||
        (row.taccdsc &&
          row.taccdsc.toLowerCase().includes(searchTextAccount.toLowerCase()))
    );

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
                quantity: "",
                Purchase: "",
                Amount: "",
                RetailRate: "",
                Tax: "",
                TotalTax: "",
                FurTax: "",
                Disc: "",
                AdvIt: "",
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
              quantity: "",
              Purchase: "",
              Amount: "",
              RetailRate: "",
              Tax: "",
              TotalTax: "",
              FurTax: "",
              Disc: "",
              AdvIt: "",
            },
          ]);
        }
      });
  };

  const firstColWidthModal = "33vw";
  const secondColWidthModal = "70vw";
  const handleArrowKeyPress = (direction) => {
    if (filteredRows.length === 0) return;

    let newIndex = highlightedRowIndex;
    let upindex = highlightedRowIndex - 10;
    let bottomindex = highlightedRowIndex + 10;

    if (direction === "up") {
      const rowElement = document.getElementById(`row-${upindex}`);
      if (rowElement) {
        rowElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      newIndex = Math.max(-1, highlightedRowIndex - 1);
    } else if (direction === "down") {
      const rowElement = document.getElementById(`row-${bottomindex}`);
      if (rowElement) {
        rowElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      newIndex = Math.min(filteredRows.length - 1, highlightedRowIndex + 1);
    }

    setHighlightedRowIndex(newIndex);
  };

  const [enterCount, setEnterCount] = useState(0);
  const firstColWidth = "5%";
  const secondColWidth = "12%";
  const thirdColWidth = " 23%";
  const fourthColWidth = "5%";
  const fifthColWidth = "7%";
  const sixthColWidth = "7%";
  const seventhColWidth = "7%";
  const eightColWidth = "7%";
  const ningthColWidth = "7%";
  const tenthColWidth = "8%";
  const eleventhColWidth = "8%";
  const twelvethColWidth = "8%";
  const thirteenColWidth = "5%";
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
  const handlePrint = () => {
    window.print();
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

            <div className="col-md-12 form-itempurchase-container">
              <NavComponent textdata="Item Purchase" />

              <Form onSubmit={handleFormSubmit} style={{ marginTop: "1%" }}>
                <div className="row">
                  <div className="col-7">
                    <div className="row">
                      <div className="col-sm-2 label-item">Pur #:</div>
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
                      <div className="col-sm-2 label-item">Supplier:</div>
                      <div className="col-sm-8" style={{ display: "flex" }}>
                        <Form.Control
                          type="text"
                          id="CustomerCode"
                          placeholder="Code"
                          name="CustomerCode"
                          className="form-control-item"
                          ref={CustomerCode}
                          value={getfrefcod}
                          style={{ marginRight: "10px", width: "90px" }}
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
                          style={{ marginRight: "4px" }}
                          onChange={handleInputChange3}
                          onKeyDown={(e) => handleEnterKeyPress(NTN, e)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-item">NTN:</div>
                      <div className="col-sm-3" style={{ display: "flex" }}>
                        <Form.Control
                          id="NTN"
                          placeholder="NTN"
                          name="NTN"
                          className="form-control-item"
                          ref={NTN}
                          onFocus={(e) => e.target.select()}
                          value={getfntnnum}
                          onChange={handleInputChange3}
                          onKeyDown={(e) => handleEnterKeyPress(STN, e)} // Adjust as needed
                        />
                      </div>
                      <div className="col-sm-2 label-item">STRN:</div>
                      <div className="col-sm-3" style={{ display: "flex" }}>
                        <Form.Control
                          id="STN"
                          placeholder="STN"
                          name="STN"
                          className="form-control-item"
                          ref={STN}
                          onFocus={(e) => e.target.select()}
                          value={getfstnnum}
                          onChange={handleInputChange3}
                          onKeyDown={(e) => handleEnterKeyPress(Address1, e)} // Adjust as needed
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2 label-item">Address:</div>
                      <div className="col-sm-8" style={{ display: "flex" }}>
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
                      <div className="col-sm-8" style={{ display: "flex" }}>
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
                          onKeyDown={(e) => handleEnterKeyPress(RefDo, e)} // Adjust as needed
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="row">
                      <div className="col-7 mt-5">
                        <br />
                        <br />
                        <div className="row ">
                          <div className="col-sm-2 label-item">Ref/Do:</div>
                          <div
                            className="col-sm-10"
                            style={{ display: "flex" }}
                          >
                            <Form.Control
                              type="text"
                              id="RefDo"
                              placeholder="Ref/Do"
                              onFocus={(e) => e.target.select()}
                              name="RefDo"
                              className="form-control-item"
                              ref={RefDo}
                              value={getRefDo}
                              // style={{width:'170px'}}
                              onChange={handleInputChange3}
                              onKeyDown={(e) => handleEnterKeyPress(GST, e)}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-2 label-item">GST#:</div>
                          <div
                            className="col-sm-10"
                            style={{ display: "flex" }}
                          >
                            <Form.Control
                              type="text"
                              id="GST"
                              placeholder="GST"
                              name="GST"
                              className="form-control-item"
                              onFocus={(e) => e.target.select()}
                              ref={GST}
                              value={getGST}
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
                            <input
                              style={{ height: "24px", marginLeft: "-10px" }}
                              type="date"
                              format="dd-mm-yyyy"
                              className="col-12"
                              value={dateFormate}
                              ref={DATE}
                              onKeyDown={(e) =>
                                handleEnterKeyPress(CustomerCode, e)
                              }
                              onChange={(e) => setDateFormate(e.target.value)}
                              // defaultValue={defaultFromDate}
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
                            Item
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
                            Qnty
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
                            Purchase
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
                            Amount
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
                            Rtl Rate
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
                            Tax
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
                            Tax Amt
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
                            Fur Tax
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
                            Disc.
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              width: twelvethColWidth,
                              textAlign: "center",
                              fontWeight: "bold",
                              fontSize: "11px",
                              borderRight: "1px solid black",
                            }}
                          >
                            Adv I.T.
                          </th>
                          <th
                            class="sticky-header"
                            style={{
                              textAlign: "center",
                              width: thirteenColWidth,
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
                                width: fourthColWidth,

                                textAlign: "center",
                                // background: "#f5f5f5",
                              }}
                            >
                              <input
                                // type="number"
                                name="quantity"
                                // placeholder="Quantity"
                                value={rowData.quantity}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => handleInputChange(e, index)}
                                ref={USEREF8}
                                data-row-index={index}
                                data-col-index={3}
                                onKeyDown={(e) => {
                                  handleNavigation(e, index, 3);

                                  const inputValue = parseFloat(e.target.value);
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    addNewRow();
                                    setTimeout(() => {
                                      handleEnterKeyPress(USEREF4, e);
                                      if (lastInputRef.current) {
                                        lastInputRef.current.focus();
                                      }
                                    }, 500);
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
                                data-col-index={5}
                                onKeyDown={(e) => handleNavigation(e, index, 5)}
                                ref={USEREF9}
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
                                name="RetailRate"
                                value={rowData.RetailRate}
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
                                name="TaxPercentage"
                                // placeholder="Percentage"
                                value={rowData.Tax}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => handleInputChange(e, index)}
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
                                name="TotalTax"
                                // placeholder="Tax"
                                value={rowData.TotalTax}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => handleInputChange(e, index)}
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
                                name="FurTax"
                                // placeholder="Tax"
                                value={rowData.FurTax}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => handleInputChange(e, index)}
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "right",
                                }}
                                data-row-index={index}
                                data-col-index={9}
                                onKeyDown={(e) => handleNavigation(e, index, 9)}
                              />
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                textAlign: "center",
                                width: eleventhColWidth,
                              }}
                            >
                              <input
                                type="text"
                                name="Disc"
                                // placeholder="Tax"
                                value={rowData.Disc}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => handleInputChange(e, index)}
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "right",
                                }}
                                data-row-index={index}
                                data-col-index={10}
                                onKeyDown={(e) =>
                                  handleNavigation(e, index, 10)
                                }
                              />
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                textAlign: "center",
                                width: twelvethColWidth,
                              }}
                            >
                              <input
                                type="text"
                                name="AdvIt"
                                // placeholder="Tax"
                                value={rowData.AdvIt}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => handleInputChange(e, index)}
                                style={{
                                  width: "100%",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  textAlign: "right",
                                }}
                                data-row-index={index}
                                data-col-index={11}
                                onKeyDown={(e) => {
                                  handleNavigation(e, index, 11);
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
                                  } else {
                                    handleNavigation(e, index, 11);
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
                                  width: thirteenColWidth,
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
                                  width: thirteenColWidth,
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
                            {Array.from({ length: 13 }).map((_, colIndex) => (
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
                              textAlign: "right",
                            }}
                          >
                            {totalQuantity || ".00"}
                          </td>

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
                            {totalAmount || ".00"}
                          </td>
                          <td
                            style={{
                              border: "1px solid #000",
                              padding: "8px",
                              width: seventhColWidth,

                              textAlign: "right",
                            }}
                          ></td>
                          <td
                            style={{
                              border: "1px solid #000",
                              padding: "8px",
                              width: eightColWidth,

                              textAlign: "center",
                            }}
                          ></td>
                          <td
                            style={{
                              border: "1px solid #000",
                              padding: "8px",
                              width: ningthColWidth,

                              textAlign: "right",
                            }}
                          >
                            {gettotaltax || ".00"}
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              borderRight: "1px solid black",
                              padding: "8px",
                              width: tenthColWidth,

                              textAlign: "right",
                            }}
                          >
                            {getfuxtax || ".00"}
                          </td>
                          <td
                            style={{
                              width: eleventhColWidth,
                              textAlign: "right",
                            }}
                          >
                            {getDisc || ".00"}
                          </td>
                          <td
                            style={{
                              width: twelvethColWidth,
                              textAlign: "right",
                            }}
                          >
                            {getAdvIt || ".00"}
                          </td>
                          <td
                            style={{
                              width: thirteenColWidth,
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
                  <GeneralModal
                    isOpen={isModalOpen}
                    handleClose={handleCloseModal}
                    title="Select Item"
                    searchText={searchText}
                    handleSearchChange={handleSearchChange}
                    searchRef={SearchBox}
                    enterCount={enterCount}
                    setEnterCount={setEnterCount}
                    handleArrowKeyPress={handleArrowKeyPress}
                    handleRowClick={handleRowClick}
                    filteredRows={filteredRows}
                    highlightedRowIndex={highlightedRowIndex}
                    tableRef={tableRef}
                    firstRowRef={firstRowRef}
                    firstColWidth={firstColWidthModal}
                    secondColWidth={secondColWidthModal}
                    firstColKey="titmcod"
                    secondColKey="titmdsc"
                  />

                  <GeneralModal
                    isOpen={isModalOpenAccount}
                    handleClose={handleCloseModalAccount}
                    title="Select Accounts"
                    searchText={searchTextAccount}
                    handleSearchChange={handleSearchChangeAccount}
                    searchRef={SearchBoxAccount}
                    enterCount={enterCount}
                    setEnterCount={setEnterCount}
                    handleArrowKeyPress={handleArrowKeyPress}
                    handleRowClick={handleRowClickAccount}
                    filteredRows={filteredRowsAccount}
                    highlightedRowIndex={highlightedRowIndex}
                    tableRef={tableRef}
                    firstRowRef={firstRowRef}
                    firstColWidth={firstColWidthModal}
                    secondColWidth={secondColWidthModal}
                    firstColKey="tacccod"
                    secondColKey="taccdsc"
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

export default Item_Purchase;
