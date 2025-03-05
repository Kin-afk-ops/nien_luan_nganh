import React from 'react'
import './styles.css';

interface Props{
    children: React.ReactNode,
    title: string,
    className?: string,
    style?: React.CSSProperties,
    isLoading?: boolean,
    error?: Error
}

const ContainerComponent = (props: Props) => {
    const { children, title, className, style, isLoading, error } = props
  return (
    <div className='container_component'>
        <h3 style={{marginBottom: 50}}>{title}</h3>
        {isLoading && <p>Loading...</p>}
        {error && <p>An error occurred: {error.message}</p>}
        <div className={className} style={style}>
            {children}
        </div>
    </div>
  )
}

export default ContainerComponent