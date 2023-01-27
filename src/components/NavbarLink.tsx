import { css } from "@/styles";
import { NavLink, NavLinkProps } from "react-router-dom";

export const NavbarLinkStyle = css({
	display: "block",
	backgroundColor: "$blue",
	color: "white",
	fontSize: "20px",
	border: "2px solid white",
	textDecoration: "none",
	padding: "4px 8px",
	flexShrink: 0,

	variants: {
		variant: {
			active: {
				backgroundColor: "white",
				color: "$blue",
			},
		},
	},
});

export const NavbarLink = (props: NavLinkProps) => {
	return (
		<NavLink
			className={({ isActive }) => NavbarLinkStyle({ variant: isActive ? "active" : undefined })}
			{...props}
		/>
	);
};
