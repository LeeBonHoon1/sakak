import { PropsWithChildren } from "react";

import DashboardHeader from "@/features/dashboard/components/header";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="p-5 space-y-4">
      <DashboardHeader />
      {children}
    </div>
  );
};

export default DashboardLayout;
