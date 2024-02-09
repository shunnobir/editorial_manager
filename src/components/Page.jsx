export default function Page({ children, ...rest }) {
  return (
    <main className={`w-full h-full ${rest.className}`} {...rest}>{children}</main>
  )
}