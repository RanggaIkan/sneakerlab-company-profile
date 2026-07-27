import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-[250ms] cubic-bezier(0.19,1,0.22,1) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-base disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent-orange text-dark-base hover:bg-accent-orange/90 orange-glow orange-glow-hover",
        secondary:
          "bg-dark-elevated text-text-primary border border-dark-border hover:bg-dark-hover",
        ghost:
          "bg-transparent text-text-secondary hover:text-text-primary hover:bg-dark-hover",
        outline:
          "bg-transparent border border-dark-border text-text-primary hover:bg-dark-hover hover:border-accent-orange/30",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-7 text-base",
        xl: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

