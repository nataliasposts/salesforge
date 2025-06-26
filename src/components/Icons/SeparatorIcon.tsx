import React from 'react'
import type { Icon } from '../../features/types'

const SeparatorIcon: React.FC<Icon> = ({
    width = 16,
    height = 16,
    fill = 'currentColor',
    ...props
}) => (
    <svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill='#ffffff'
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M6 12L10 8L6 4"
            stroke={fill}
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export default SeparatorIcon
