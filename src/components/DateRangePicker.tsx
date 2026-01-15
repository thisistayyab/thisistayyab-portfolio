import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (startDate: Date | null, endDate: Date | null) => void;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectingStart, setSelectingStart] = useState(true);
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Check if click is outside both the button and the calendar
      const isOutsideButton = buttonRef.current && !buttonRef.current.contains(target);
      const isOutsideCalendar = calendarRef.current && !calendarRef.current.contains(target);
      
      if (isOutsideButton && isOutsideCalendar) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // Use a small delay to ensure calendar is rendered and ref is set
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside, true);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside, true);
      };
    }
  }, [isOpen]);

  // Set current month to start date or today
  useEffect(() => {
    if (startDate) {
      setCurrentMonth(new Date(startDate));
    }
  }, [startDate]);

  // Calculate position when opening - center the calendar
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const calendarWidth = 320; // min-w-[320px]
      // Center the calendar relative to the button
      const left = rect.left + (rect.width / 2) - (calendarWidth / 2);
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatDisplayDate = (): string => {
    if (!startDate && !endDate) return 'Select date range';
    if (startDate && !endDate) return `${formatDate(startDate)} – ...`;
    if (startDate && endDate) return `${formatDate(startDate)} – ${formatDate(endDate)}`;
    return 'Select date range';
  };

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const normalizeDate = (date: Date): Date => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  };

  const isDateInRange = (date: Date): boolean => {
    if (!startDate || !endDate) return false;
    
    // Normalize all dates to midnight for accurate comparison
    const normalizedDate = normalizeDate(date);
    const normalizedStart = normalizeDate(startDate);
    const normalizedEnd = normalizeDate(endDate);
    
    // Compare timestamps
    return normalizedDate.getTime() >= normalizedStart.getTime() && 
           normalizedDate.getTime() <= normalizedEnd.getTime();
  };

  const isDateSelected = (date: Date): boolean => {
    if (!startDate && !endDate) return false;
    
    const normalizedDate = normalizeDate(date);
    
    if (startDate) {
      const normalizedStart = normalizeDate(startDate);
      if (normalizedDate.getTime() === normalizedStart.getTime()) return true;
    }
    
    if (endDate) {
      const normalizedEnd = normalizeDate(endDate);
      if (normalizedDate.getTime() === normalizedEnd.getTime()) return true;
    }
    
    return false;
  };

  const isDateDisabled = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
  };

  const handleDateClick = (day: number, isDoubleClick: boolean = false) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    clickedDate.setHours(0, 0, 0, 0);

    if (isDateDisabled(clickedDate)) return;

    // Double-click: set both start and end to the same date
    if (isDoubleClick) {
      onChange(clickedDate, clickedDate);
      setSelectingStart(true);
      return;
    }

    if (selectingStart || !startDate) {
      // Selecting start date
      if (endDate && clickedDate > endDate) {
        // If clicked date is after end date, set it as new end date and start as new start
        onChange(clickedDate, null);
        setSelectingStart(false);
      } else {
        onChange(clickedDate, null);
        setSelectingStart(false);
      }
    } else {
      // Selecting end date
      if (clickedDate < startDate!) {
        // If clicked date is before start date, swap them
        onChange(clickedDate, startDate);
        setSelectingStart(false);
      } else {
        onChange(startDate, clickedDate);
        // Don't close automatically - let user click outside to close
      }
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const days = [];
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return (
    <div className={`relative ${className}`} ref={pickerRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white hover:bg-gray-600 transition-colors min-w-[280px]"
      >
        <Calendar size={18} className="text-gray-400" />
        <span className="text-sm">{formatDisplayDate()}</span>
      </button>

      {isOpen && buttonRef.current && createPortal(
        <>
          {/* Backdrop overlay - only for visual separation, no click handler */}
          <div
            className="fixed inset-0 z-[99998] bg-transparent pointer-events-none"
            aria-hidden="true"
          />
          {/* Calendar dropdown - centered */}
          <div
            ref={calendarRef}
            style={{
              position: 'fixed',
              top: `${position.top}px`,
              left: `${position.left}px`,
              zIndex: 99999,
            }}
            className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-4 min-w-[320px]"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigateMonth('prev');
              }}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
            >
              <ChevronLeft size={20} className="text-gray-400" />
            </button>
            <h3 className="text-lg font-semibold text-white">{monthName}</h3>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigateMonth('next');
              }}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
            >
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className="text-center text-xs text-gray-400 font-medium py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
              date.setHours(0, 0, 0, 0); // Normalize to midnight
              const isSelected = isDateSelected(date);
              const inRange = isDateInRange(date);
              const isDisabled = isDateDisabled(date);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const isToday = date.getTime() === today.getTime();

              return (
                <button
                  key={day}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDateClick(day, false);
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    handleDateClick(day, true);
                  }}
                  disabled={isDisabled}
                  className={`
                    aspect-square rounded transition-colors text-sm
                    ${isDisabled ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-gray-700 cursor-pointer'}
                    ${isSelected ? 'bg-blue-600 text-white font-semibold' : ''}
                    ${inRange && !isSelected ? 'bg-blue-500/30' : ''}
                    ${isToday && !isSelected ? 'ring-2 ring-blue-500' : ''}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Quick select buttons */}
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const today = new Date();
                today.setHours(23, 59, 59, 999);
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(today.getDate() - 6); // Include today, so 7 days total
                sevenDaysAgo.setHours(0, 0, 0, 0);
                onChange(sevenDaysAgo, today);
                setIsOpen(false);
              }}
              className="flex-1 px-3 py-2 text-xs font-medium text-white bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 hover:border-gray-500 transition-colors cursor-pointer"
            >
              Last 7 days
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const today = new Date();
                today.setHours(23, 59, 59, 999);
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(today.getDate() - 29); // Include today, so 30 days total
                thirtyDaysAgo.setHours(0, 0, 0, 0);
                onChange(thirtyDaysAgo, today);
                setIsOpen(false);
              }}
              className="flex-1 px-3 py-2 text-xs font-medium text-white bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 hover:border-gray-500 transition-colors cursor-pointer"
            >
              Last 30 days
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const today = new Date();
                today.setHours(23, 59, 59, 999);
                const ninetyDaysAgo = new Date();
                ninetyDaysAgo.setDate(today.getDate() - 89); // Include today, so 90 days total
                ninetyDaysAgo.setHours(0, 0, 0, 0);
                onChange(ninetyDaysAgo, today);
                setIsOpen(false);
              }}
              className="flex-1 px-3 py-2 text-xs font-medium text-white bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 hover:border-gray-500 transition-colors cursor-pointer"
            >
              Last 90 days
            </button>
          </div>
        </div>
        </>,
        document.body
      )}
    </div>
  );
};
