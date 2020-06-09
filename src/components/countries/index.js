import React, { useState, useEffect } from "react";
import "./index.css";

function Countries() {
  const [toggle, setToggle] = useState("closed");
  const [countries, setCountries] = useState();
  const countriesQuery = `{
    countries {
        name
        emoji
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
              data-toggle={toggle}
              key={country.name}
            >
              <h2 className="countries-list__item__headline">
                <span className="countries-list__item__icon">
                  {country.emoji}
                </span>
                {country.name}
              </h2>
            </li>
          );
        })}
    </ul>
  );
}

export default Countries;
