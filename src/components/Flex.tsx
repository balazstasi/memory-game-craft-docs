/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";
import tw from "twin.macro";

/**
 * Flexbox component using tailwind macros
 */
export const Flex = ({ children }: { children: ReactNode }) => {
  return (
    <div
      tw={
        "grid grid-rows-4 grid-flow-col text-center justify-center items-center mt-4"
      }
    >
      {children}
    </div>
  );
};
