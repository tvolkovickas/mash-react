import { useState, useEffect } from "react";
import Button from "./Button";
import "./App.css";

const Category = ({ title, options, setOption, optionCategory }) => (
  <div className="category">
    <div>{title}</div>
    {options.map((option, index) => (
      <input
        className={option.excluded ? "excluded option" : "option"}
        key={index}
        value={option.value}
        onChange={(e) => setOption(e.target.value, index, optionCategory)}
      />
    ))}
  </div>
);

function App() {
  const [options, setOptions] = useState([
    [
      { value: "", excluded: false },
      { value: "", excluded: false },
      { value: "", excluded: false },
      { value: "", excluded: false },
    ],
    [
      { value: "", excluded: false },
      { value: "", excluded: false },
      { value: "", excluded: false },
      { value: "", excluded: false },
    ],
    [
      { value: "", excluded: false },
      { value: "", excluded: false },
      { value: "", excluded: false },
      { value: "", excluded: false },
    ],
    [
      { value: "", excluded: false },
      { value: "", excluded: false },
      { value: "", excluded: false },
      { value: "", excluded: false },
    ],
  ]);
  const [removedOptions, setRemovedOptions] = useState([0, 0, 0, 0]);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [optionIndex, setOptionIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  const [eliminate, setEliminate] = useState(false);
  const [useTimer, setUseTimer] = useState(false);
  const [finishGame, setFinishGame] = useState(false);

  useEffect(() => {
    if (useTimer) {
      const interval = setInterval(() => setCounter(counter + 1), 1000);

      return () => clearInterval(interval);
    }
  }, [useTimer, counter]);

  useEffect(() => {
    if (eliminate) {
      const interval = setInterval(() => {
        if (
          removedOptions[0] === 3 &&
          removedOptions[1] === 3 &&
          removedOptions[2] === 3 &&
          removedOptions[3] === 3
        ) {
          setEliminate(false);
          setFinishGame(true);
          return;
        }

        let currentCategory = categoryIndex;
        let currentOption = optionIndex;
        let currentOptions = [...options];
        let currentRemovedOptions = [...removedOptions];

        let stepsTaken = 0;
        while (stepsTaken < counter) {
          if (
            !currentOptions[currentCategory][currentOption].excluded &&
            currentRemovedOptions[currentCategory] < 3
          ) {
            stepsTaken += 1;
          }

          if (stepsTaken === counter) {
            currentOptions[currentCategory][currentOption].excluded = true;
            currentRemovedOptions[currentCategory] += 1;
          }

          currentOption += 1;
          if (currentOption === 4) {
            currentOption = 0;
            currentCategory += 1;
            if (currentCategory === 4) {
              currentCategory = 0;
            }
          }
        }

        setCategoryIndex(currentCategory);
        setOptionIndex(currentOption);
        setOptions([...currentOptions]);
        setRemovedOptions([...currentRemovedOptions]);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [eliminate, removedOptions, categoryIndex, optionIndex, counter, options]);

  const updateOptions = (option, index, optionCategory) => {
    const currentOptions = [...options];
    currentOptions[optionCategory][index] = { value: option, excluded: false };
    setOptions(currentOptions);
  };

  const getFinalValue = (options) =>
    options.filter((o) => !o.excluded)[0].value;

  const startElimination = () => {
    const isValidInput = options.filter((category) => {
      return category.filter((option) => option.value === "").length !== 0;
    });
    if (isValidInput.length != 0) {
      alert("Please enter all values!");
    } else {
      setEliminate(!eliminate);
    }
  };
  return (
    <main>
      <h2 className="header">Welcome to Mash</h2>
      <div className="container">
        <h3 className="header">Please enter values for your categories:</h3>
        <Category
          title="Car"
          options={options[0]}
          setOption={updateOptions}
          optionCategory={0}
        />
        <Category
          title="Job"
          options={options[1]}
          setOption={updateOptions}
          optionCategory={1}
        />
        <Category
          title="Husband"
          options={options[2]}
          setOption={updateOptions}
          optionCategory={2}
        />
        <Category
          title="Kids"
          options={options[3]}
          setOption={updateOptions}
          optionCategory={3}
        />
        <div className="controls">
          <div>Timer: {counter}</div>
          <div>
            {(counter == 0 || useTimer) && (
              <Button
                onClick={() => setUseTimer(!useTimer)}
                title={`${useTimer ? "Stop" : "Start"} Timer`}
              />
            )}

            {counter != 0 && !eliminate && !useTimer && !finishGame && (
              <Button onClick={startElimination} title="Start Elimination" />
            )}

            {finishGame && (
              <div>
                <h3 className="header"> Your result:</h3>
                <div className="results">
                  <ul>
                    <li>{`Car: ${getFinalValue(options[0])}.`}</li>
                    <li>{`Job: ${getFinalValue(options[1])}.`}</li>
                    <li>{`Husband: ${getFinalValue(options[2])}.`}</li>
                    <li>{`Kids: ${getFinalValue(options[3])}.`}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
