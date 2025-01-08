import { PropsWithChildren } from "react";

interface Props {
  label: string;
}

export const Stat = ({ label, children }: PropsWithChildren<Props>) => {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="font-bold">{children}</span>
    </div>
  );
};
