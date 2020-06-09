import React, { useState, useEffect } from "react";
import Country from "../country";
import "./index.css";

function Countries() {
  const toggle = false;
  const [code, setCode] = useState("");
  const [countries, setCountries] = useState();
  const countriesQuery = `{
    countries   
      {
        name, 
        emoji, 
        code
      }
  }`;
  const baseURL = "https://countries.trevorblades.com/";
  useEffect(() => {
    async function getCountries() {
      const { data } = await fetch(baseURL, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          query: countriesQuery,
        }),
      }).then((res) => {
        return res.json();
      });
      setCountries(data);
    }
    getCountries();
  }, [countriesQuery]);
  return (
    <ul className="countries-list-container">
      {countries &&
        countries.countries.map((country) => {
          return (
            <li
              className="countries-list__item"
              data-toggle={code === country.code ? !toggle : toggle}
              data-country-code={country.code}
              key={country.name}
              onClick={(e) => {
                if (
                  e.currentTarget.dataset.countryCode === country.code &&
                  !code
                ) {
                  setCode(country.code);
                  return;
                }
                return setCode("");
              }}
            >
              <h2 className="countries-list__item__headline">
                <span className="countries-list__item__icon">
                  {country.emoji}
                </span>
                {country.name}
              </h2>
              {code === country.code && <Country code={country.code} />}
            </li>
          );
        })}
    </ul>
  );
}

export default Countries;
