import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { ItemsPage, IdolsPage, UpgradesPage, AboutPage } from "@/pages";
import { useSpriteSheetStore } from "@/stores";
import { NavbarLink } from "@/components";
import holocureLogo from "./assets/holocure-logo-sm.png";

import './App.scss'

export const App = () => {
  const [loadSpriteOffsets, loaded] = useSpriteSheetStore(state => [
    state.loadSpriteOffsets,
    state.loaded,
  ]);

  React.useEffect(() => {
    loadSpriteOffsets();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <div className="app">
      <nav className="navbar flex-row align-center align-x-center">

        <div className="content-container flex-row align-x-center gap-10">
          <img src={holocureLogo} alt="HoloCure Logo" />

          <section className="menu flex-row align-x-center gap-5" style={{ flexBasis: '1fr' }}>
            <NavbarLink to="items">Items</NavbarLink>
            <NavbarLink to="idols">Idols</NavbarLink>
            <NavbarLink to="upgrades">Upgrades</NavbarLink>
            <NavbarLink to="about">About</NavbarLink>
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
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="items" />} />
        </Routes>
      </main>
    </div >
  )
}