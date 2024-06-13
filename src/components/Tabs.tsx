import React from "react";
import { useState, ReactNode } from "react";

type TabProps = {
  label: string;
  children: ReactNode;
};

type TabsProps = {
  children: ReactNode;
};

const Tab = ({ label, children }: TabProps) => {
  return <div>{children}</div>;
};

const Tabs = ({ children }: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = React.Children.toArray(children);

  return (
    <div>
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 rounded-t-2xl transition-colors duration-300 ${
              index === selectedTab
                ? "bg-red-500 text-green"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setSelectedTab(index)}
          >
            {(tab as any).props.label}
          </button>
        ))}
      </div>
      <div className="">{tabs[selectedTab]}</div>
    </div>
  );
};

Tabs.Tab = Tab;

export default Tabs;
