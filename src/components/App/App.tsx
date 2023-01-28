import { Navigate, Outlet, useMatch } from "react-router-dom";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

import { globalStyles } from "@/styles";
import {
	ContentContainer,
	NavbarLink,
	RedditIcon,
	YoutubeIcon,
} from "@/components";
import HOLOCURE_LOGO from "@/assets/holocure-logo-sm.png";
import {
	StyledApp,
	Navbar,
	NavbarLinks,
	DownloadLink,
	PageContent,
	IconLink,
} from "./AppStyled";

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

					<IconLink
						href="https://github.com/shabla/holocure-infos"
						target="_blank"
						rel="noopener noreferrer"
						title="This website's Github page"
					>
						<GitHubLogoIcon />
					</IconLink>

					<IconLink
						href="https://www.reddit.com/r/holocure/"
						target="_blank"
						rel="noopener noreferrer"
						title="The game's subreddit"
					>
						<RedditIcon />
					</IconLink>

					<IconLink
						href="https://www.youtube.com/@holocuregame"
						target="_blank"
						rel="noopener noreferrer"
						title="The game's YouTube channel"
					>
						<YoutubeIcon />
					</IconLink>

					<IconLink
						href="https://twitter.com/HoloCureGame"
						target="_blank"
						rel="noopener noreferrer"
						title="The game's dev Twitter"
					>
						<TwitterLogoIcon />
					</IconLink>

					<DownloadLink
						href="https://kay-yu.itch.io/holocure"
						target="_blank"
						rel="noopener noreferrer"
						title="The game's Itch.io page"
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
