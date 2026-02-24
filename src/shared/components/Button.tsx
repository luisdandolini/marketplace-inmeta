import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "rounded-md py-2 px-4 text-sm font-medium transition-opacity disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-secondary text-white hover:opacity-90",
        outline: "border border-primary text-primary hover:bg-primary/10",
        danger: "bg-red-600 text-white hover:opacity-90",
      },
      size: {
        sm: "py-1 px-3 text-xs",
        md: "py-2 px-4 text-sm",
        lg: "py-3 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = ({ variant, size, className, ...props }: ButtonProps) => {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
};
