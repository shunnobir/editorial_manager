import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function genRandomString(
  length: number,
  onlyDigits: boolean = false,
  upperCase: boolean = false
) {
  const lookups =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let str = "";
  for (let i = 0; i < length; ++i) {
    str += lookups.charAt(
      Math.random() * (onlyDigits ? 10 : lookups.length - (upperCase ? 26 : 0))
    );
  }

  return str;
}
