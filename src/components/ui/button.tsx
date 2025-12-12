import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-2xl text-lg font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-button hover:shadow-lg active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-coral hover:shadow-lg active:scale-[0.98]",
        outline: "border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground active:scale-[0.98]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-soft active:scale-[0.98]",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        coral: "gradient-coral text-accent-foreground shadow-coral hover:shadow-lg hover:brightness-105 active:scale-[0.98]",
        voice: "gradient-sky text-primary-foreground shadow-button hover:shadow-lg hover:brightness-105 active:scale-[0.98] rounded-full",
        emergency: "bg-destructive text-destructive-foreground shadow-coral hover:bg-destructive/90 hover:shadow-lg active:scale-[0.98]",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-soft active:scale-[0.98]",
      },
      size: {
        default: "min-h-[56px] px-8 py-3",
        sm: "min-h-[48px] rounded-xl px-6 text-base",
        lg: "min-h-[64px] rounded-3xl px-10 text-xl",
        xl: "min-h-[72px] rounded-3xl px-12 text-xl",
        icon: "h-14 w-14 rounded-full",
        "icon-lg": "h-20 w-20 rounded-full",
        "icon-xl": "h-24 w-24 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
