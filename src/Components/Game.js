import React, { useEffect, useState } from "react";
import _ from "lodash";
import classNames from "classnames";

const Game = ({ data }) => {
  const [country, setCountry] = useState([]);
  const [countrySelected, setCountrySelected] = useState([]);
  const [correctCountry, setCorrectCountry] = useState([]);
  const [matched, setMatched] = useState(new Set());

  useEffect(() => {
    const allCountry = Object.entries(data).flat();

    setCountry(_.shuffle(allCountry));
  }, []);

  // Main function

  const handleCountrySelected = (e) => {
    const { target } = e;
    const value = target.getAttribute("data-value");

    const selectedCountry = countrySelected.concat(value);

    if (selectedCountry.length === 2) {
      // Here we have to check where the capital is correct or not.

      const [first, second] = selectedCountry;
      if (data[first] === second || data[second] === first) {
        setCorrectCountry(selectedCountry);

        setTimeout(() => {
          setMatched(new Set([...matched, ...selectedCountry]));
          setCountrySelected([]);
          setCorrectCountry([]);
        }, 2000);
      } else {
        setCountrySelected(selectedCountry);
        setTimeout(() => {
          setCountrySelected([]);
        }, 2000);
      }
    } else {
      setCountrySelected(selectedCountry);
    }

    console.log(selectedCountry);
  };

  // Restart function

  const handleRestart = () => {
    //write code there to restart the game
    setCountry([]);
    setCountrySelected([]);
    setCorrectCountry([]);
    setMatched(new Set());

    // Reset the game data
    const allCountry = Object.entries(data).flat();
    setCountry(_.shuffle(allCountry));
  };

  // JSX Start from here
  if (matched.size === country.length) {
    return (
      <>
        <h1>Restart Game</h1>
        <div className="restart-container">
          <button className="restart" onClick={handleRestart}>
            Restart
          </button>
        </div>
      </>
    );
  } else
    return (
      <div>
        <h1>Match the Correct Country and Capital</h1>
        <div className="button-container">
          {country.map((items) => {
            if (matched.has(items)) {
              return null;
            }

            const isSelected =
              countrySelected.includes(items) || correctCountry.includes(items);
            const isCorrect = correctCountry.includes(items);
            const isIncorrect = countrySelected.length === 2 && isSelected;

            return (
              <button
                className={classNames(
                  "option",
                  isSelected && "selected",
                  isIncorrect && "incorrect",
                  isCorrect && "correct"
                )}
                key={items}
                onClick={handleCountrySelected}
                data-value={items}
              >
                {items}
              </button>
            );
          })}
        </div>
      </div>
    );
};

export default Game;

// import React, { useEffect, useState } from 'react';
// import _ from 'lodash';

// const Game = ({ data }) => {
//   const [country, setCountry] = useState([]);

//   useEffect(() => {
//     const allCountry = Object.entries(data).flat();

//     setCountry(_.shuffle(allCountry));
//   }, []);

//   const handleSelection = () => {

//   };

//   return (
//     <div>
//       <h1>Match the Correct Country and Capital</h1>
//       <div className="button-container">
//       {country.map((items) => {

//           return (
//             <button
//               className="option"
//               key={items}
//               onClick={handleSelection}
//               data-value={items}
//             >
//               {items}
//             </button>
//           );
//         })}

//       </div>
//     </div>
//   )
// }

// export default Game;
