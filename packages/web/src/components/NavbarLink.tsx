import { css } from "@/styles";
import { NavLink, NavLinkProps } from "react-router-dom";

export const NavbarLinkStyle = css({
	display: "block",
	backgroundColor: "$darkBlue",
	color: "white",
	height: "$navbarHeight",
	lineHeight: "calc($sizes$navbarHeight - 5px)",
	fontSize: "20px",
	borderTop: "5px solid $darkBlue",
	textDecoration: "none",
	padding: "0 $3",
	flexShrink: 0,

	"&:hover": {
		backgroundColor: "rgba(255,255,255,0.1)",
	},

	variants: {
		active: {
			true: {
				backgroundColor: "$blue",
				color: "white",
				"&:hover": {
					backgroundColor: "$blue",
				},
			},
		},
	},
});

export const NavbarLink = (props: NavLinkProps) => {
	return (
		<NavLink
			className={({ isActive }) => NavbarLinkStyle({ active: isActive })}
			{...props}
		/>
	);
};
