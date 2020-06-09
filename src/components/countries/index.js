import React, { useEffect } from "react";
import "./index.css";

function Countries() {
  useEffect(() => {
    console.log("helllo");
  }, []);
  return <ul className="countries-container"></ul>;
}

export default Countries;
