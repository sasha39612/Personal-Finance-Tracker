import React, { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface PopupProps {
  children: ReactNode;
  onClose: () => void;
}

const Popup = ({ children, onClose }: PopupProps) => {
  const el = document.createElement('div');

  useEffect(() => {
    const portalRoot = document.getElementById('portal-root');
    if (portalRoot) {
      portalRoot.appendChild(el);
    }
    return () => {
      if (portalRoot) {
        portalRoot.removeChild(el);
      }
    };
  }, [el]);

  return ReactDOM.createPortal(
    <div className="fixed flex content-center z-10 top-3 w-[100%] h-[100%]" onClick={onClose}>
      <div className="relative overflow-y-auto  bg-white py-3 px-1 mt-[10%] mx-[5%] w-auto rounded-s-lg" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-1 right-1 bg-none, border-none text-sm cursor-pointer" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>,
    el,
  );
};

export default Popup;
