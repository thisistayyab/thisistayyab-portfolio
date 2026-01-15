import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: 'text-red-400',
      button: 'bg-red-500 hover:bg-red-600 text-white',
      border: 'border-red-500/20',
    },
    warning: {
      icon: 'text-yellow-400',
      button: 'bg-yellow-500 hover:bg-yellow-600 text-white',
      border: 'border-yellow-500/20',
    },
    info: {
      icon: 'text-blue-400',
      button: 'bg-blue-500 hover:bg-blue-600 text-white',
      border: 'border-blue-500/20',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <Card
        className="max-w-md w-full"
        hoverScale={false}
        hoverLift={false}
        glowColor="transparent"
        gradientColors={[]}
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="p-6 pb-4 border-b border-gray-700">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className={`p-2 rounded-lg bg-gray-800 ${styles.border} border`}>
                <AlertTriangle size={24} className={styles.icon} />
              </div>
              <CardTitle className="text-xl">{title}</CardTitle>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
              aria-label="Close modal"
              disabled={isLoading}
            >
              <X size={20} />
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-4">
          <p className="text-gray-300 leading-relaxed">{message}</p>
        </CardContent>
        <CardFooter className="p-6 pt-4 border-t border-gray-700 flex gap-3 justify-end">
          <Button
            onClick={onClose}
            variant="outline"
            className="cursor-pointer"
            disabled={isLoading}
            glowColor="transparent"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            className={`${styles.button} cursor-pointer`}
            disabled={isLoading}
            glowColor={variant === 'danger' ? '#ef4444' : variant === 'warning' ? '#eab308' : '#3b82f6'}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Processing...</span>
              </div>
            ) : (
              confirmText
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
