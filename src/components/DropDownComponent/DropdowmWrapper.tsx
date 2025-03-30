import React, { useState } from 'react';
import "./sidebarDropdown.css";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";


interface DropdownWrapperProps {
    label: string;
    children: React.ReactNode;
}

const DropdownWrapper =(props: DropdownWrapperProps) => {
    const { children, label } = props;
    const [isOpen, setIsOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState<string>('');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className="dropdown_menu">
      <div className="label">
        <h3>{label}</h3>
        <IoIosArrowDown onClick={toggleDropdown} size={20} className={`arrow-icon ${isOpen ? "open" : "close"}`}/>
      </div>
      {isOpen && (
        <div className={`dropdown_list ${isOpen ? "open" : "closed"}`}>
          {children}
        </div>
      )}
       
    </div>
  );

};

export default DropdownWrapper;