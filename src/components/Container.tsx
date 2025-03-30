import React from 'react';
import "../styles/globalStyle.css";
interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
    return <div className='container'>{children}</div>;
};

export default Container;

