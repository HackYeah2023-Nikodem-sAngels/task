import * as React from "react";

import { cn } from "@/lib/utils";
import ReactTextareaAutosize from "react-textarea-autosize";
import { VariantProps, cva } from "class-variance-authority";

const textAreaVariants = cva(
    "flex h-20 w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            size: {
                default: "text-sm",
                lg: "text-base",
            },
        },
        defaultVariants: {
            size: "default",
        },
    },
);

type TextareaProps = React.ComponentPropsWithRef<typeof ReactTextareaAutosize> &
    VariantProps<typeof textAreaVariants>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, size, ...props }, ref) => {
        return (
            <ReactTextareaAutosize
                className={cn(textAreaVariants({ className, size }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Textarea.displayName = "Textarea";

export { Textarea };
