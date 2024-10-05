import React, { useRef } from "react";

const ButtonGroupp = ({
  Submit,
  handleFocus,
  handleBlur,
  handleSave,
  handleReturn,
  handleClear,
  handleFormSubmit,
}) => {
  const Return = useRef(null);
  const Clear = useRef(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: "2px",
        borderTop: "1px solid gray ",
      }}
    >
      <button
        style={{
          border: "1px solid #FFFFFF",
          width: "75px",
          height: "25px",
          marginTop: "2px",
          color: "white",
          backgroundColor: "#3368B5",
        }}
        onFocus={() => handleFocus(Submit)}
        onBlur={() => handleBlur(Submit)}
        accessKey="s"
        onKeyDown={(event) => {
          if (event.altKey && event.key === "s") {
            handleSave();
            event.preventDefault();
          } else if (event.key === "ArrowRight") {
            Return.current.focus();
            event.preventDefault();
          }
        }}
        onClick={handleFormSubmit}
        ref={Submit}
      >
        Save
      </button>

      <button
        style={{
          border: "1px solid #FFFFFF",
          width: "75px",
          marginLeft: "2px",
          height: "25px",
          marginTop: "2px",
          color: "white",
          backgroundColor: "#3368B5",
        }}
        accessKey="r"
        onKeyDown={(event) => {
          if (event.altKey && event.key === "r") {
            handleReturn();
            event.preventDefault();
          } else if (event.key === "ArrowRight") {
            Clear.current.focus();
            event.preventDefault();
          } else if (event.key === "ArrowLeft") {
            Submit.current.focus();
            event.preventDefault();
          }
        }}
        onFocus={() => handleFocus(Return)}
        onBlur={() => handleBlur(Return)}
        ref={Return}
        onClick={handleReturn}
      >
        Return
      </button>

      <button
        style={{
          border: "1px solid #FFFFFF",
          width: "75px",
          marginLeft: "2px",
          height: "25px",
          marginTop: "2px",
          color: "white",
          backgroundColor: "#3368B5",
        }}
        accessKey="c"
        onKeyDown={(event) => {
          if (event.altKey && event.key === "c") {
            handleClear();
            event.preventDefault();
          } else if (event.key === "ArrowLeft") {
            Return.current.focus();
            event.preventDefault();
          } else if (event.key === "ArrowRight") {
            Submit.current.focus();
            event.preventDefault();
          }
        }}
        ref={Clear}
        onFocus={() => handleFocus(Clear)}
        onBlur={() => handleBlur(Clear)}
        onClick={handleClear}
      >
        New
      </button>
    </div>
  );
};

export default ButtonGroupp;
