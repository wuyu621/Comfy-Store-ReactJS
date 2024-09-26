import { useState } from "react";
import { formatPrice } from "../utils";

const FormRange = ({ label, name, size, price }) => {
  const step = 1000;
  const maxPrice = 100000;
  const [selectPrice, setSelectPrice] = useState(price || maxPrice);
  return (
    <div className="form-control">
      <label htmlFor={name} className="label capitalize cursor-pointer">
        <span className="label-text capitalize">{label}</span>
        <span className="label-text">{formatPrice(selectPrice)}</span>
      </label>
      <input
        type="range"
        name={name}
        min={0}
        max={maxPrice}
        step={step}
        value={selectPrice}
        className={`range range-primary ${size}`}
        onChange={(e) => setSelectPrice(e.target.value)}
      />
      <div className="w-full flex justify-between px-2 mt-2 text-xs">
        <span className="text-md font-bold">0</span>
        <span className="text-md font-bold">Max : {formatPrice(maxPrice)}</span>
      </div>
    </div>
  );
};

export default FormRange;
