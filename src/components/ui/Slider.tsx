import { ReactNode } from "react";

interface Props {
  min: number;
  max: number;
  value: number;
  label: string;
  valueLabel?: ReactNode;
  className?: string;
  onChange: (newValue: number) => void;
}

export const Slider = ({
  value,
  label,
  valueLabel,
  max,
  min,
  className,
  onChange,
}: Props) => {
  return (
    <span className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span>{valueLabel}</span>
    </span>
  );
};
