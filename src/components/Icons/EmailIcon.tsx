import React from 'react'
import type { Icon } from '../../features/types'

const EmailIcon: React.FC<Icon> = ({
    width = 24,
    height = 24,
    fill = 'currentColor',
    ...props
}) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v.01L12 13 20 6.01V6H4zm0 12h16V8l-8 7L4 8v10z" />
    </svg>
)

export default EmailIcon
