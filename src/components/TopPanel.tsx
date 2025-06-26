import React from "react";

interface TopPanelProps {
  breadcrumbIcon: React.ReactNode;
  separator: React.ReactNode;
  breadcrumbText: string;
  title: string;
}

const TopPanel: React.FC<TopPanelProps> = ({
  breadcrumbIcon,
  separator,
  breadcrumbText,
  title,
}) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex items-center gap-[6px]">
        {breadcrumbIcon}
        {separator}
        <p className="text-sm font-medium leading-5 text-gray-600">
          {breadcrumbText}
        </p>
      </div>
      <h1 className="text-[25px] [@media(min-width:469px)]:text-[28px] md:text-[30px] font-semibold text-gray-900 leading-[38px]">
        {title}
      </h1>
    </div>
  );
};

export default TopPanel;
