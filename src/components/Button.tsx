import { forwardRef, type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", ...props }, ref) => (
    <button
      ref={ref}
      className={`button button--${variant} ${className}`.trim()}
      {...props}
    />
  )
);

Button.displayName = "Button";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, className = "", label, title, ...props }, ref) => (
    <button
      ref={ref}
      aria-label={label}
      className={`icon-button ${className}`.trim()}
      title={title ?? label}
      {...props}
    >
      {children}
    </button>
  )
);

IconButton.displayName = "IconButton";
