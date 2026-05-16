import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MessageSquare, CheckCircle, ChevronLeft, ChevronRight, X, Phone, ChevronDown, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { useBookingModal } from '../../context/BookingModalContext';

const timeSlots = [
  { value: '09:00', label: '09:00 - 10:00' },
  { value: '10:00', label: '10:00 - 11:00' },
  { value: '11:00', label: '11:00 - 12:00' },
  { value: '14:00', label: '14:00 - 15:00' },
  { value: '15:00', label: '15:00 - 16:00' },
  { value: '16:00', label: '16:00 - 17:00' },
];

const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

const BookingModal = () => {
  const { isOpen, closeBookingModal, prefilledMessage } = useBookingModal();
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  useEffect(() => {
    if (isOpen && prefilledMessage) {
      setBookingData(prev => ({ ...prev, message: prefilledMessage }));
    }
  }, [isOpen, prefilledMessage]);

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleTimeSelect = (value) => {
    setBookingData({ ...bookingData, time: value });
    setShowTimeDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setBookingData({ name: '', email: '', phone: '', date: '', time: '', message: '' });
      closeBookingModal();
    }, 3000);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    while (days.length % 7 !== 0) {
      days.push(null);
    }
    
    return days;
  };

  const selectDate = (day) => {
    if (!day) return;
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setBookingData({ ...bookingData, date: selectedDate.toISOString().split('T')[0] });
    setShowCalendar(false);
  };

  const openCalendar = () => {
    if (bookingData.date) {
      const selectedDate = new Date(bookingData.date + 'T00:00:00');
      setCurrentMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth()));
    } else {
      setCurrentMonth(new Date());
    }
    setShowCalendar(true);
  };

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return 'Choisir une date';
    const date = new Date(dateStr + 'T00:00:00');
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={closeBookingModal}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-primary flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              Prendre rendez-vous
            </h2>
            <button
              onClick={closeBookingModal}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Rendez-vous confirmé !</h3>
                <p className="text-green-700 text-sm">Nous vous contacterons pour confirmer votre réservation.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={bookingData.name}
                      onChange={handleChange}
                      placeholder="Votre nom *"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleChange}
                      placeholder="Email *"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleChange}
                      placeholder="Téléphone"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={openCalendar}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm text-left flex items-center justify-between bg-white"
                    >
                      <span className={bookingData.date ? 'text-primary' : 'text-gray-400'}>
                        {formatDisplayDate(bookingData.date)}
                      </span>
                      <Calendar className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm text-left flex items-center justify-between bg-white"
                  >
                    <span className={bookingData.time ? 'text-primary' : 'text-gray-400'}>
                      {bookingData.time ? timeSlots.find(t => t.value === bookingData.time)?.label : 'Sélectionner un créneau *'}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showTimeDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {showTimeDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-40 top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
                      >
                        <div className="grid grid-cols-2">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot.value}
                              type="button"
                              onClick={() => handleTimeSelect(slot.value)}
                              className={`px-4 py-3 text-sm transition-colors border-r border-b border-gray-100 last:border-r-0 ${
                                bookingData.time === slot.value ? 'bg-accent text-white' : 'hover:bg-gray-50 text-primary'
                              }`}
                            >
                              {slot.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    value={bookingData.message}
                    onChange={handleChange}
                    placeholder="Votre message ou motif du rendez-vous..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm resize-none"
                  />
                  <MessageSquare className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button type="submit" variant="primary" size="md" className="justify-center flex-1">
                    Réserver
                    <ArrowRight className="ml-2" size={16} strokeWidth={3} />
                  </Button>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96, y: 0 }}
                    type="button"
                    className="w-12 h-12 rounded-full border border-primary/30 text-primary hover:bg-primary/5 hover:border-primary cursor-pointer flex items-center justify-center bg-transparent transition-all duration-300"
                    aria-label="Appeler directement"
                  >
                    <Phone size={18} strokeWidth={2} />
                  </motion.button>
                </div>
              </form>
            )}
          </div>

          {/* Calendar Modal */}
          <AnimatePresence>
            {showCalendar && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50"
                onClick={() => setShowCalendar(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-3xl shadow-2xl p-6 w-[350px] max-w-[90vw]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <button type="button" onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <span className="font-semibold text-lg text-primary">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </span>
                    <button type="button" onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map((day, i) => (
                      <div key={i} className="text-center text-xs text-gray-400 font-medium py-2">{day}</div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(currentMonth).map((day, i) => {
                      const today = new Date();
                      const isToday = day && day === today.getDate() && currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear();
                      const isSelected = bookingData.date && (() => {
                        const selected = new Date(bookingData.date + 'T00:00:00');
                        return day === selected.getDate() && currentMonth.getMonth() === selected.getMonth() && currentMonth.getFullYear() === selected.getFullYear();
                      })();
                      
                      return (
                        <button
                          key={i}
                          type="button"
                          disabled={!day}
                          onClick={() => selectDate(day)}
                          className={`p-3 text-sm font-medium rounded-xl transition-all ${!day ? 'invisible' : isSelected ? 'bg-accent text-white' : isToday ? 'border-2 border-accent text-accent' : 'hover:bg-accent/10 text-primary hover:text-accent'}`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;