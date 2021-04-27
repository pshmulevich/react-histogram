import React from "react";

const minChartWidth = 1000;
const maxRectWidth = 40;
const minRectWidth = 2;
const svgHeight = 250;

/**
 *  Draw the histogram via rectangles
 * @param Object keyValues
 * @param int rangeOfValues
 */
const renderBars = (keyValues, rangeOfValues) => {
  // console.log(keyValues);

  // Find max value to normalize the bar height to fit into fixed height chart
  const maxValue = keyValues.reduce((max, element) => {
    const value = element.value;
    return max > value ? max : value;
  }, 0);

  const scaleCoef = svgHeight / maxValue; //coef larger if height bigger
  // console.log(Math.floor(keyValue.value * scaleCoef));
  const verticalOffset = scaleCoef * maxValue;

  const normalizedValues = keyValues.map((keyValue) => {
    // console.log("values: ", keyValues);
    return Math.floor(keyValue.value * scaleCoef);
  });

  // Render each rectangle
  const renderRect = (x, y, rectWidth, rectHeight, keyValue) => {
    return (
      <rect x={x} y={y} width={rectWidth} height={rectHeight}>
        <title>
          Freq of {keyValue.key}: {keyValue.value}
        </title>
      </rect>
    );
  };

  // Calculate the minimum width for each rectangle
  const minComputedRectWidth = Math.min(
    maxRectWidth,
    minChartWidth / (rangeOfValues + 1)
  );
  return normalizedValues.map((value, index) => {
    const rectWidth = Math.max(minComputedRectWidth, minRectWidth);
    const rectHeight = value;
    const x = rectWidth * index;
    const y = verticalOffset - value; // Because chart inverted

    return (
      <g key={index}>
        {renderRect(x, y, rectWidth, rectHeight, keyValues[index])}
      </g>
    );
  });
};

/**
 * Creates a bucket map
 * @param Object [] inputArray
 */
const makeBuckets = (inputArray) => {
  // Sorted alphabetically unless a sorter function is provided
  // See: https://stackoverflow.com/a/1063027
  const sortedData = inputArray.sort((a, b) => a - b);
  const bucketMap = new Map();
  const minElement = sortedData[0];
  const maxElement = sortedData[sortedData.length - 1];
  // console.log("minElement", minElement);
  // console.log("maxElement", maxElement);
  const rangeOfValues = maxElement - minElement;
  for (var i = minElement; i <= maxElement; i++) {
    bucketMap.set(i, 0); //pre-fill buckets with 0's
  }
  sortedData.forEach((element) => {
    bucketMap.set(element, bucketMap.get(element) + 1);
  });
  return { bucketMap, rangeOfValues };
};

/**
 * Draw the complete histogram
 * @param Object [] inputArray
 */
const Histogram = ({ inputArray }) => {
  // console.log(inputArray);
  const { bucketMap, rangeOfValues } = makeBuckets(inputArray);
  // console.log("bucketMap: ", bucketMap);

  //traverses map, displays key and value
  const values = [];
  // transfer data from the map to an array
  bucketMap.forEach((value, key, map) => {
    // console.log(`${key} => ${value}`);
    values.push({ key, value });
  });

  return (
    <div className="svg-parent">
      <svg height={svgHeight} className="svg-container">
        {renderBars(values, rangeOfValues)}
      </svg>
    </div>
  );
};

export default Histogram;
