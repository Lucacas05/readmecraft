import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 border-2 border-border px-4 py-3 text-sm font-black uppercase tracking-[0.16em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-accent",
        inverted: "bg-secondary text-secondary-foreground hover:bg-foreground hover:text-background",
        outline: "bg-background text-foreground hover:bg-highlight",
        ghost: "border-transparent bg-transparent text-foreground hover:border-border hover:bg-muted",
        link: "border-transparent bg-transparent px-0 py-0 text-foreground underline underline-offset-4 hover:text-primary",
      },
      size: {
        default: "min-h-12",
        sm: "min-h-10 px-3 py-2 text-xs",
        lg: "min-h-14 px-6 py-4 text-base",
        icon: "h-12 w-12 px-0 py-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
