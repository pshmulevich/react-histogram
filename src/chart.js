import React, { useState } from "react";
import Information from "./info";
import Histogram from "./histogram";

/**
 * Creates a randomized array meant as default values for the barchart
 * @param int size
 * @param int max
 */
const generateRandomArray = (size, max) => {
  //see: https://stackoverflow.com/a/52327785
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * max) - max / 2
  );
};

/**
 * Splits input string on commas, converts to numbers, then sorts
 * @param int inputValue
 */
const parseInput = (inputValue) => {
  const inputData = inputValue.split(",");
  const numericData = inputData.map((element) => parseInt(element, 10));
  // Sorted alphabetically unless a sorter function is provided
  // See: https://stackoverflow.com/a/1063027
  const sortedData = numericData.sort((a, b) => a - b);
  // console.log(sortedData);
  return sortedData;
};

/**
 * Generate random array, set input data, return structure with data
 */
const Chart = () => {
  const [inputData, setInputData] = useState(
    // Generates a random array for input field
    generateRandomArray(1000, 100).join(",")
  );
  // Sets the input data
  const updateInputData = (e) => {
    const inputValue = e.target.value;
    setInputData(inputValue);
  };
  // Input needs to handle non numbers like commas and spaces
  const getInputArray = () => {
    const isInputEmpty = inputData.trim() === "";
    const inputArray = isInputEmpty ? [] : parseInput(inputData);
    const filteredInputArray = inputArray.filter((element) => !isNaN(element));
    console.log("filteredInputArray", filteredInputArray);
    return filteredInputArray;
  };

  return (
    <div className="chart-frame">
      <Information />
      <input
        value={inputData}
        onChange={updateInputData}
        type="text"
        title="Enter array of numbers"
        className="input"
      ></input>
      <Histogram inputArray={getInputArray()} />
    </div>
  );
};

export default Chart;
