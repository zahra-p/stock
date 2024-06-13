import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <main className="flex-grow flex">
        <div className="container mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
