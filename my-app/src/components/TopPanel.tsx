import React from 'react'

interface TopPanelProps {
    breadcrumbIcon: React.ReactNode
    separator: React.ReactNode
    breadcrumbText: string
    title: string
}

const TopPanel: React.FC<TopPanelProps> = ({ breadcrumbIcon, separator, breadcrumbText, title }) => {
    return (
        <div className="flex flex-col gap-[8px] mb-[20px]">
            <div className="flex items-center gap-[6px]">
                {breadcrumbIcon}
                {separator}
                <p className="text-sm font-medium leading-5 text-gray-600">{breadcrumbText}</p>
            </div>
            <h1 className="text-[30px] font-semibold leading-[38px] text-gray-900">{title}</h1>
        </div>
    )
}

export default TopPanel
