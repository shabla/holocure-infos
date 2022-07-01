import { useEffect, useState } from "react";
import classNames from "classnames";

import { Box, Sprite } from "@/components";
import { Upgrade } from "@/models/Upgrade";
import { useUpgradesStore } from "@/stores/upgradesStore";

import "./UpgradesPage.scss";

export const UpgradesPage = () => {
  const [selectedUpgrade, setSelectedUpgrade] = useState<Upgrade>();
  const [loaded, upgrades, loadUpgrades] = useUpgradesStore(state => [
    state.loaded,
    state.upgrades,
    state.loadUpgrades
  ])

  useEffect(() => {
    loadUpgrades().then(upgrades => setSelectedUpgrade(upgrades[0]));
  }, [])

  const getUpgradeTotalCost = (upgrade: Upgrade): number => {
    return upgrade.costs.reduce((acc, cost) => acc + cost, 0);
  }

  if (!loaded) {
    return null;
  }

  return (
    <div className="page-upgrades flex-row content-container" style={{ gap: 10 }}>
      <Box label="Upgrades" className="upgrades">
        {upgrades.map(upgrade => (
          <div
            className={classNames("upgrade flex-row align-x-center", { selected: upgrade === selectedUpgrade })}
            onClick={() => setSelectedUpgrade(upgrade)}
            key={upgrade.name}
          >
            <Sprite
              type="upgrade"
              offset={upgrade.spriteOffset}
              showBackground={upgrade === selectedUpgrade}
            />
            {upgrade.name}
          </div>
        ))}
      </Box>

      <Box label={selectedUpgrade?.name} className="details flex-fill">
        {selectedUpgrade && (
          <>
            <div className="desc">
              {selectedUpgrade.desc}
            </div>

            <div className="costs">
              {selectedUpgrade.costs.join(' / ')} (Total: {getUpgradeTotalCost(selectedUpgrade)})
            </div>
          </>
        )}
      </Box>
    </div>
  )
}