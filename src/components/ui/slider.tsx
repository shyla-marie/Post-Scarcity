import React, { useState, ChangeEvent } from 'react';
import './styles/slider.css';

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number[];
  onValueChange: (value: number[]) => void;
}

export const Slider: React.FC<SliderProps> = ({ min, max, step, value, onValueChange }) => {
  const [sliderValue, setSliderValue] = useState(value[0]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setSliderValue(newValue);
    onValueChange([newValue]);
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={handleChange}
        className="slider"
      />
      <div className="slider-value">{sliderValue}</div>
    </div>
  );
};




// // src/components/ui/slider.js

// import React, { useState } from 'react';
// import './styles/slider.css';

// export const Slider = ({ min, max, step, value, onValueChange }) => {
//   const [sliderValue, setSliderValue] = useState(value[0]);

//   const handleChange = (event) => {
//     const newValue = parseFloat(event.target.value);
//     setSliderValue(newValue);
//     onValueChange([newValue]);
//   };

//   return (
//     <div className="slider-container">
//       <input
//         type="range"
//         min={min}
//         max={max}
//         step={step}
//         value={sliderValue}
//         onChange={handleChange}
//         className="slider"
//       />
//       <div className="slider-value">{sliderValue}</div>
//     </div>
//   );
// };