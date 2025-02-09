import { cva, type VariantProps } from "class-variance-authority";

export { default as Alert } from "./Alert.vue";
export { default as AlertDescription } from "./AlertDescription.vue";
export { default as AlertTitle } from "./AlertTitle.vue";

export const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "bg-destructive/5 border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        info: "bg-info/5 border-info/50 text-info dark:border-info [&>svg]:text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type AlertVariants = VariantProps<typeof alertVariants>;
