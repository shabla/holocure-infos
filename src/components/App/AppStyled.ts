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
  alignCrossCenter
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
  alignCrossCenter
);

export const DownloadLink = styled(
  "a",
  {
    backgroundColor: "$pink",
    flexShrink: 0,
  },
  NavbarLinkStyle
);

export const PageContent = styled("main", {
  padding: "$1",
  marginTop: "$sizes$navbarHeight",
  flex: "1 1 auto",
  zIndex: 0,
});

export const StyledApp = styled("div", { display: "flex" });
