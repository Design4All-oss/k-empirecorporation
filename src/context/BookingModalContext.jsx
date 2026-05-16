import React, { createContext, useContext, useState } from 'react';

const BookingModalContext = createContext();

export const useBookingModal = () => useContext(BookingModalContext);

export const BookingModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prefilledMessage, setPrefilledMessage] = useState('');

  const openBookingModal = (message = '') => {
    setPrefilledMessage(message);
    setIsOpen(true);
  };

  const closeBookingModal = () => {
    setIsOpen(false);
    setPrefilledMessage('');
  };

  return (
    <BookingModalContext.Provider value={{ isOpen, openBookingModal, closeBookingModal, prefilledMessage }}>
      {children}
    </BookingModalContext.Provider>
  );
};