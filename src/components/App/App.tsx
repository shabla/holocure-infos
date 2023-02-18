import { Navigate, Outlet, useMatch } from "react-router-dom";
import {
	GitHubLogoIcon,
	TwitterLogoIcon,
	GlobeIcon,
} from "@radix-ui/react-icons";
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
import { defaultRoute } from "@/config";
import { Suspense } from "react";

export const App = () => {
	// Redirect to the default route when landing on the root path
	const match = useMatch("/");
	if (match) {
		return <Navigate to={defaultRoute} />;
	}

	globalStyles();

	return (
		<StyledApp>
			<Navbar>
				<ContentContainer>
					<img
						src={HOLOCURE_LOGO}
						alt="HoloCure Logo"
						height="50"
						width="119"
					/>

					<NavbarLinks>
						<NavbarLink to="build">Build</NavbarLink>
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
						href="https://holocure.fandom.com/wiki/HoloCure_Wiki"
						target="_blank"
						rel="noopener noreferrer"
						title="Fan Wiki"
					>
						<GlobeIcon />
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
				<Suspense fallback={<>loading...</>}>
					<Outlet />
				</Suspense>
			</PageContent>
		</StyledApp>
	);
};
