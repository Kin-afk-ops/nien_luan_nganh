import React, { useEffect } from 'react'
import "./styles.css";

interface Props {
    children: React.ReactNode;
    onClose?: () => void;
    isOpen?: boolean;
}

const BottomSheetModalComponent = (props: Props) => {
    const { children, onClose, isOpen } = props;

    useEffect(() => {
        // Close the modal when the ESC key is pressed
        const handleEscapeKey = (event: KeyboardEvent) => {
          if (event.key === 'Escape' && onClose) {
            onClose();
          }
        };
        window.addEventListener('keydown', handleEscapeKey);
        
        return () => {
          window.removeEventListener('keydown', handleEscapeKey);
        };
      }, [onClose]);

      if(!isOpen) return null;

      const handleBackdropClick = () => {
        if (onClose) {
          onClose();
        }
      };

  return (
    <div className="modal_bottom_container" onClick={handleBackdropClick}>
        <div className="bottom-sheet-modal" onClick={(e) => e.stopPropagation()}>
            <div className="bottom_sheet_content">
                {children}
            </div>
        </div>
    </div>
  )
}

export default BottomSheetModalComponent