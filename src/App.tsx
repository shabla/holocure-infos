import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { ItemsPage, IdolsPage, UpgradesPage} from "@/pages";
import { useSpriteSheetsStore } from "@/stores";
import { NavbarLink } from "@/components";
import HOLOCURE_LOGO from "./assets/holocure-logo-sm.png";

import './App.scss'

export const App = () => {
  const [loadSpriteSheets, loaded] = useSpriteSheetsStore(state => [
    state.loadSpriteSheets,
    state.loaded,
  ]);

  React.useEffect(() => {
    loadSpriteSheets();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <div className="app">
      <nav className="navbar flex-row align-center align-x-center">

        <div className="content-container flex-row align-x-center gap-10">
          <img src={HOLOCURE_LOGO} alt="HoloCure Logo" />

          <section className="menu flex-row align-x-center gap-5" style={{ flexBasis: '1fr' }}>
            <NavbarLink to="items">Items</NavbarLink>
            <NavbarLink to="idols">Idols</NavbarLink>
            <NavbarLink to="upgrades">Upgrades</NavbarLink>
          </section>

          <a href="https://kay-yu.itch.io/holocure" target="_blank" rel="noopener noreferrer" className="download flex-noshrink">
            Download the game!
          </a>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="idols" element={<IdolsPage />} >
            <Route path=":idolId" element={<IdolsPage />} />
          </Route>
          <Route path="items" element={<ItemsPage />} />
          <Route path="upgrades" element={<UpgradesPage />} />
          <Route path="*" element={<Navigate to="items" />} />
        </Routes>
      </main>
    </div >
  )
}