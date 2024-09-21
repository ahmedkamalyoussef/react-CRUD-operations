import { ButtonHTMLAttributes, ReactNode } from "react"

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>{
children:ReactNode,
classes:string,
width?:"w-full" | "w-fit"
}
function Button ({children ,classes,width="w-full",...rest}:IProps) {
  return (
    <button className={`${classes} ${width} p-2 rounded-md text-white`} {...rest}>{children}</button>
  )
}

export default Button