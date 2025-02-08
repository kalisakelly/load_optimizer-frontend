/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';

const Notification = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000); // Auto-close after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  }[type];

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-md text-white ${bgColor} shadow-lg`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={() => setVisible(false)} className="ml-4">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;