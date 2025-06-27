import React from 'react';
import { cn } from '../../lib/utils';

export const Card = ({ className, ...props }) => (
  <div className={cn('bg-white border border-gray-200 rounded-2xl shadow-sm', className)} {...props} />
);

export const CardContent = ({ className, ...props }) => (
  <div className={cn('p-4', className)} {...props} />
);
