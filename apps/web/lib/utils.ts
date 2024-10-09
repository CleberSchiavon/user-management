import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const defineHomeGreeting = () => {
  let currentDate = new Date();
  let currentHour = currentDate.getHours();
  if (currentHour >= 3 && currentHour < 12) {
    return "Bom dia";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Boa tarde";
  } else if (
    (currentHour >= 18 && currentHour <= 23) ||
    (currentHour >= 0 && currentHour < 3)
  ) {
    return "Boa noite";
  }
};