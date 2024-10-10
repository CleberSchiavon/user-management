import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * @param {string} [label] - The label for the input.
   */
  label?: string;

  /**
   * @param {string} [labelClassName] - The class name for the label.
   */
  labelClassName?: string;

  /**
   * Event handler for the input's change event.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event object.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * @param {string} [type] - The type of the input element.
   */
  type?: string;

  /**
   * @param {string} [placeholder] - The placeholder text for the input element.
   */
  placeholder?: string;
  /**
   * @param {string | number | undefined} [value] - The value for the input element.
   */
  value?: string | number | undefined;

  /**
   * @param {string} [errorMessage] - The error message to display.
   */
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      labelClassName,
      label,
      type,
      onChange,
      errorMessage,
      ...props
    }: InputProps,
    ref,
  ) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            className={cn("text-sm text-gray-800 font-normal", labelClassName)}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            `flex h-10 bg-white rounded-lg border ${
              errorMessage && "border-red-500"
            } text-black text-sm  px-3 py-6  placeholder:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
            className,
          )}
          ref={ref}
          onChange={onChange}
          {...props}
        />
        <p className="text-xs text-red-500 font-semibold">{errorMessage}</p>
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
