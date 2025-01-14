import { observer } from "mobx-react";
import {
  lowerCaseLetters,
  numbers,
  symbols,
  upperCaseLetters,
  whiteSpace,
} from "../../../constants/characters";
import { configStore } from "../../../stores/configStore";
import { Slider } from "../../ui/Slider";
import { Character } from "./Character";

export const Config = observer(() => {
  const { targetSpeed, setTargetSpeed } = configStore;

  return (
    <>
      <h1 className="text-3xl mb-4 mt-4">Config</h1>
      <Slider
        className="mb-6"
        label="Target speed"
        min={20}
        max={1000}
        value={targetSpeed}
        valueLabel={
          <>
            <div>{targetSpeed} characters per minute</div>
            <div>(~{(targetSpeed / 6).toFixed(0)} words per minute)</div>
          </>
        }
        onChange={setTargetSpeed}
      />
      <div className="mb-4 flex flex-wrap gap-1">
        {lowerCaseLetters.map((character) => (
          <Character key={character} character={character} />
        ))}
      </div>
      <div className="mb-4 flex flex-wrap gap-1">
        {upperCaseLetters.map((character) => (
          <Character key={character} character={character} />
        ))}
      </div>
      <div className="mb-4 flex flex-wrap gap-1">
        {numbers.map((character) => (
          <Character key={character} character={character} />
        ))}
      </div>
      <div className="mb-4 flex flex-wrap gap-1">
        {symbols.map((character) => (
          <Character key={character} character={character} />
        ))}
      </div>
      <div className="mb-4 flex flex-wrap gap-1">
        {whiteSpace.map((character) => (
          <Character key={character} character={character} />
        ))}
      </div>
    </>
  );
});
