import React from "react";

/**
 * The information and instruction portion
 */
const Information = () => {
  return (
    <div>
      <h1>Histogram</h1>
      <p>
        <b>Information:</b>
      </p>
      <p>
        This Web Application is written using Vanilla Javascript, CSS, and HTML
      </p>
      <p>
        <b>Instructions:</b>
      </p>
      <p>
        By default, an array of random numbers populates the input field below.
        A histogram of number frequencies is automatically plotted. Enter a
        sequence of comma-separated numbers and then press the Tab or Enter key
        to plot your own histogram.
      </p>
    </div>
  );
};

export default Information;
