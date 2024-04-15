import { cn } from "@/lib/utils";

export default function Page(props) {
  const { children, className, ...rest } = props;
  return (
    <main className={cn("flex w-full flex-1 ", className)} {...rest}>{children}</main>
  )
}