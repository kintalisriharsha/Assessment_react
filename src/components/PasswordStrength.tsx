// src/components/PasswordStrength.tsx
import React from 'react';

interface PasswordStrengthProps {
  password: string;
}

const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
};

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const strength = calculatePasswordStrength(password);
  const strengthLabels = [
    'Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'
  ];

  return (
    <div className="mt-2">
      <div className="h-2 w-full bg-gray-200 rounded">
        <div 
          className={`h-2 rounded transition-all duration-300 ${
            strength === 1 ? 'bg-red-500 w-1/5' :
            strength === 2 ? 'bg-orange-500 w-2/5' :
            strength === 3 ? 'bg-yellow-500 w-3/5' :
            strength === 4 ? 'bg-green-500 w-4/5' :
            strength === 5 ? 'bg-green-600 w-full' : 'bg-gray-200 w-0'
          }`}
        ></div>
      </div>
      <p className="text-sm mt-1 text-gray-600">
        Password Strength: {strengthLabels[strength - 1] || 'Very Weak'}
      </p>
    </div>
  );
};

export default PasswordStrength;