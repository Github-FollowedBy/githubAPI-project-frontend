import React, { useEffect, useState } from "react";
const { quotes } = require("./Quotes");

function RandomQuotes(props) {
  const [quote, setQuote] = useState(
    "Programming isn't about what you know; it's about what you can figure out."
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const tempIndex = Math.floor(Math.random() * quotes.length);
      const tempQuote = quotes[tempIndex].name;
      setQuote(tempQuote);
    }, 5 * 1000);
    return () => clearInterval(intervalId);
  });
  const textStyle = {
    fontSize: 30,
    borderTop: "3px solid #bf0024",
    fontFamily: "FontAwesome",
    color: "black",
    textAlign: "center",
  };
  return (
    <div>
      <blockquote>
        <p style={textStyle}>{quote}</p>
      </blockquote>
      <br />
    </div>
  );
}

export default RandomQuotes;
