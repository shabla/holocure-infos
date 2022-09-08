import { NavLink, NavLinkProps } from "react-router-dom";

export const NavbarLink = (props: NavLinkProps) => {
  return (
    <NavLink className={({ isActive }) => isActive ? ' active' : ''} {...props} />
  )
}