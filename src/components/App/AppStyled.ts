import { alignCenter, alignCrossCenter, styled } from "@/styles";
import { NavbarLinkStyle } from "../NavbarLink";

export const Navbar = styled(
	"nav",
	{
		width: "100%",
		height: "$navbarHeight",
		position: "fixed",
		backgroundColor: "$darkBlue",
		zIndex: 10,
		display: "flex",
		flexDirection: "row",
	},
	alignCenter,
	alignCrossCenter,
);

export const NavbarLinks = styled(
	"section",
	{
		gap: "$1",
		flexBasis: "1fr",
		color: "white",
		textAlign: "center",
		flex: "1 1 auto",
		display: "flex",
		flexDirection: "row",

		"> img": {
			height: "$navbarHeight",
		},
	},
	alignCrossCenter,
);

export const DownloadLink = styled("a", {
	backgroundColor: "$pink",
	flexShrink: 0,
	color: "white",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: "calc($navbarHeight * 0.7)",
	fontSize: "16px",
	textDecoration: "none",
	borderRadius: 12,
	padding: "0 $4",
	fontWeight: "700",
	"&:hover": {
		backgroundColor: "white",
		color: "$darkBlue",
	},
});

export const IconLink = styled("a", {
	color: "white",
	flexShrink: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: "$navbarHeight",
	width: "$navbarHeight",

	"&:hover": {
		backgroundColor: "white",
		color: "$darkBlue",
		cursor: "pointer",

		"& svg": {
			fill: "$darkBlue",
		},
	},

	"& svg": {
		height: "24px",
		width: "24px",
		fill: "white",
	},
});

export const PageContent = styled("main", {
	padding: "$2",
	marginTop: "$sizes$navbarHeight",
	flex: "1 1 auto",
	zIndex: 0,
	background: `
    linear-gradient(
      to bottom,
      $blue 15%,
      $blueHalfOpacity
    ),
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 10px,
      $darkBlueHalfOpacity 10px,
      $darkBlueHalfOpacity 30px
    )
  `,
});

export const StyledApp = styled("div", { minHeight: "100vh", display: "flex" });
