import React, { useState, useEffect } from "react";
import "./index.css";

function Country({ code }) {
  const [country, setCountry] = useState([]);
  const countryByCodeQuery = `
  query getCountry($code: ID!) {
    country(code: $code) {
      name
      code
      continent {
        name
      }
      capital
      currency
      languages {
        name
      }
      states {
        name
      }
    }
  }
`;
  const baseURL = "https://countries.trevorblades.com/";

  useEffect(() => {
    async function getCountries(code) {
      const { data } = await fetch(baseURL, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          query: countryByCodeQuery,
          variables: {
            code,
          },
        }),
      }).then((res) => res.json());
      setCountry([data.country]);
    }
    getCountries(code);
  }, [countryByCodeQuery, code]);

  return (
    <section className="countries-list__item__content">
      {country.map((obj) => {
        return (
          <div key={obj.code}>
            <p>
              <label className="countries-list__item__label">Capital:</label>
              {obj.capital}
            </p>
            <p>
              <label className="countries-list__item__label">Currency:</label>
              {obj.currency}
            </p>
            <p>
              <label className="countries-list__item__label">Located in:</label>
              {obj.continent.name}
            </p>
            <p>
              <label className="countries-list__item__label">
                {obj.languages.length > 1 ? "Language(s):" : "Language:"}
              </label>
              {obj.languages.map(
                (lang, index) =>
                  `${
                    obj.languages.length > 1 && index < obj.languages.length - 1
                      ? `${lang.name}, `
                      : lang.name
                  }`
              )}
            </p>
          </div>
        );
      })}
    </section>
  );
}

export default Country;
