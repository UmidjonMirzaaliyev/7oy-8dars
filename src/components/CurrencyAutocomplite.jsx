import React, { useState, useEffect } from "react";

import data from "../data/data.json";

const CurrencyAutocomplete = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);

  useEffect(() => {
    setCurrencyData(data);
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = currencyData.filter((item) => {
      const currencyCode = Object.keys(item.currencies)[0];
      const currencyName = item.currencies[currencyCode].name.toLowerCase();
      return (
        currencyName.includes(value) ||
        currencyCode.toLowerCase().includes(value)
      );
    });

    setFilteredData(filtered);
  };

  const handleSelect = (currencyCode, currencyName) => {
    setSearchTerm(`${currencyCode} – ${currencyName}`);
    setFilteredData([]);
  };

  return (
    <div className="relative w-80 mx-auto mt-10">
      <label
        htmlFor="currency"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        From
      </label>
      <input
        type="text"
        id="currency"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Select a currency..."
        className="w-full p-2 border border-gray-300 rounded"
      />
      {filteredData.length > 0 && (
        <div className="absolute w-full bg-white border border-gray-300 mt-1 rounded shadow-md z-10 max-h-60 overflow-y-auto">
          {filteredData.map((item) => {
            const currencyCode = Object.keys(item.currencies)[0];
            const currencyName = item.currencies[currencyCode].name;
            return (
              <div
                key={currencyCode}
                onClick={() => handleSelect(currencyCode, currencyName)}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              >
                <img src={item.flag} alt="flag" className="w-6 h-6 mr-2" />
                {currencyCode} – {currencyName}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CurrencyAutocomplete;
