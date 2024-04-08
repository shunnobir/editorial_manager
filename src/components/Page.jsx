import { cn } from "@/lib/utils";

export default function Page(props) {
  const { children, className, ...rest } = props;
  return (
    <main className={cn("w-full h-full ", className)} {...rest}>{children}</main>
  )
}