import React from 'react'

interface Props {
    label: string;
    onClick?: () => void;
    style?: React.CSSProperties;
}

const ButtonComponent = (props: Props) => {
    const { label, onClick, style } = props

    const localStyle: React.CSSProperties = {
        justifyContent: 'center',
        padding: '15px 32px',
        alignItems: 'center',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%',
        margin: '5px 0',
        fontWeight: 'bold',
        display: 'flex',
       ...style,
    }

  return (
    <div style={localStyle} onClick={onClick}>{label}</div>
  )
}

export default ButtonComponent
