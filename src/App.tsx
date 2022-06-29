import { NavLink, Routes, Route, Navigate } from "react-router-dom";

import holocureLogo from "./assets/holocure-logo-sm.png";
import { ItemsPage } from "./pages/ItemsPage/ItemsPage";
import { IdolsPage } from "./pages/IdolsPage/IdolsPage";
import { UpgradesPage } from "./pages/UpgradesPage/UpgradesPage";
import { AboutPage } from "./pages/AboutPage/AboutPage";

import './App.scss'

export const App = () => {
  return (
    <div className="app">
      <nav className="nav">
        <section>
          <img src={holocureLogo} />

          <NavLink to="items" className={({ isActive }) => isActive ? 'active' : ''}>Items</NavLink>
          <NavLink to="idols" className={({ isActive }) => isActive ? 'active' : ''}>Idols</NavLink>
          <NavLink to="upgrades" className={({ isActive }) => isActive ? 'active' : ''}>Upgrades</NavLink>
          <NavLink to="about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
        </section>

        <section className="bottom">
          <a href="https://kay-yu.itch.io/holocure" target="_blank" rel="noopener noreferrer">
            Download the game!
          </a>
        </section>
      </nav>

      <main>
        <Routes>
          <Route path="idols" element={<IdolsPage />} />
          <Route path="items" element={<ItemsPage />} />
          <Route path="upgrades" element={<UpgradesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="items" />} />
        </Routes>
      </main>
    </div >
  )
}