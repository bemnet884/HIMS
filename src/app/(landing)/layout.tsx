// app/(landing)/layout.tsx
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

const LandingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default LandingLayout;
