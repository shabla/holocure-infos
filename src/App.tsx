import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { styled, globalStyles } from "@/styles";
import { alignCenter, alignCrossCenter } from "@/styles/flex";
import { ItemsPage, IdolsPage, UpgradesPage } from "@/pages";
import { useSpriteSheetsStore } from "@/stores";
import { ContentContainer, NavbarLink, NavbarLinkStyle } from "@/components";
import HOLOCURE_LOGO from "./assets/holocure-logo-sm.png";

const Navbar = styled(
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

const NavbarLinks = styled(
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

const DownloadLink = styled(
  "a",
  {
    backgroundColor: "$pink",
    flexShrink: 0,
  },
  NavbarLinkStyle
);

const PageContent = styled("main", {
  padding: "$1",
  marginTop: "$sizes$navbarHeight",
  flex: "1 1 auto",
  zIndex: 0,
});

const StyledApp = styled("div", { display: "flex" });

export const App = () => {
  const [loadSpriteSheets, loaded] = useSpriteSheetsStore((state) => [
    state.loadSpriteSheets,
    state.loaded,
  ]);

  useEffect(() => {
    loadSpriteSheets();
  }, []);

  if (!loaded) {
    return null;
  }

  globalStyles();

  return (
    <StyledApp>
      <Navbar>
        <ContentContainer>
          <img src={HOLOCURE_LOGO} alt="HoloCure Logo" />

          <NavbarLinks>
            <NavbarLink to="items">Items</NavbarLink>
            <NavbarLink to="idols">Idols</NavbarLink>
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
        <Routes>
          <Route path="idols" element={<IdolsPage />}>
            <Route path=":idolId" element={<IdolsPage />} />
          </Route>
          <Route path="items" element={<ItemsPage />} />
          <Route path="upgrades" element={<UpgradesPage />} />
          <Route path="*" element={<Navigate to="items" />} />
        </Routes>
      </PageContent>
    </StyledApp>
  );
};
