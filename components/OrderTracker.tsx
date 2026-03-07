'use client';

import { Check, Clock, ChefHat, Package, Truck, CheckCircle } from 'lucide-react';
import type { OrderStatus } from '@/types';

const steps: { status: OrderStatus; label: string; icon: React.ElementType }[] = [
  { status: 'received', label: 'Order Received', icon: Clock },
  { status: 'preparing', label: 'Preparing', icon: ChefHat },
  { status: 'ready', label: 'Ready', icon: Package },
  { status: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
  { status: 'delivered', label: 'Delivered', icon: CheckCircle },
];

interface OrderTrackerProps {
  currentStatus: OrderStatus;
}

export default function OrderTracker({ currentStatus }: OrderTrackerProps) {
  const currentIndex = steps.findIndex((s) => s.status === currentStatus);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-cream-dark" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-leaf-green transition-all duration-500"
          style={{
            width: `${currentIndex === -1 ? 0 : (currentIndex / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.status} className="relative flex flex-col items-center z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isCompleted
                    ? 'bg-leaf-green text-white'
                    : 'bg-cream-dark text-gray-400'
                } ${isCurrent ? 'ring-4 ring-leaf-green/20' : ''}`}
              >
                {isCompleted && index < currentIndex ? (
                  <Check size={18} />
                ) : (
                  <Icon size={18} />
                )}
              </div>
              <span
                className={`text-xs mt-2 text-center max-w-[80px] ${
                  isCompleted ? 'text-leaf-green font-medium' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
