import { BadgeProps } from '@/types/product';
import React from 'react';

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default', 
  size = 'default',
  className = '' 
}) => {
  const baseClasses = 'inline-flex items-center rounded-full font-medium transition-colors';
  
  const variants: Record<string, string> = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    outline: 'border border-gray-300 text-gray-700'
  };
  
  const sizes: Record<string, string> = {
    sm: 'px-2 py-1 text-xs',
    default: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base'
  };

  return (
    <span className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;

