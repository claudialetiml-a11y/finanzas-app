'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PinInputProps {
  length?: number;
  onComplete: (pin: string) => void;
  onChangePin?: (pin: string) => void;
  disabled?: boolean;
  error?: boolean;
}

export function PinInput({
  length = 6,
  onComplete,
  onChangePin,
  disabled = false,
  error = false,
}: PinInputProps) {
  const [pin, setPin] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    const pinString = newPin.join('');
    onChangePin?.(pinString);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newPin.every((digit) => digit !== '')) {
      onComplete(pinString);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (pin[index]) {
        const newPin = [...pin];
        newPin[index] = '';
        setPin(newPin);
        const pinString = newPin.join('');
        onChangePin?.(pinString);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').slice(0, length).split('');

    if (digits.length > 0) {
      const newPin = [...pin];
      digits.forEach((digit, index) => {
        if (index < length) {
          newPin[index] = digit;
        }
      });
      setPin(newPin);
      const pinString = newPin.join('');
      onChangePin?.(pinString);

      if (newPin.every((digit) => digit !== '')) {
        onComplete(pinString);
      }
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      {pin.map((digit, index) => (
        <input
          key={index}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          type="password"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={cn(
            'w-14 h-14 text-center text-2xl font-bold rounded-lg border-2 transition-all',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            disabled && 'bg-gray-100 cursor-not-allowed',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
          )}
        />
      ))}
    </div>
  );
}
