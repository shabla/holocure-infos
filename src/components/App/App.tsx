import { Navigate, Outlet, useMatch } from "react-router-dom";

import { globalStyles } from "@/styles";
import { ContentContainer, NavbarLink } from "@/components";
import HOLOCURE_LOGO from "@/assets/holocure-logo-sm.png";
import { StyledApp, Navbar, NavbarLinks, DownloadLink, PageContent } from "./AppStyled";

export const App = () => {
	const match = useMatch("/");

	globalStyles();

	if (match) {
		return <Navigate to="items" />;
	}

	return (
		<StyledApp>
			<Navbar>
				<ContentContainer>
					<img src={HOLOCURE_LOGO} alt="HoloCure Logo" />

					<NavbarLinks>
						<NavbarLink to="items">Items</NavbarLink>
						<NavbarLink to="upgrades">Upgrades</NavbarLink>
					</NavbarLinks>

					<DownloadLink
						href="https://kay-yu.itch.io/holocure"
						target="_blank"
						rel="noopener noreferrer"
					>
						Download the game!
					</DownloadLink>
				</ContentContainer>
			</Navbar>

			<PageContent>
				<Outlet />
			</PageContent>
		</StyledApp>
	);
};
