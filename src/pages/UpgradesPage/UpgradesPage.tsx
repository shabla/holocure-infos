import { useEffect, useState } from "react";

import { Upgrade } from "@/models/Upgrade";
import { Box, Sprite } from "@/components";

export const UpgradesPage: React.FC = () => {
  const [upgrades, setUpgrades] = useState<Upgrade[]>();
  const [selectedUpgrade, setSelectedUpgrade] = useState<Upgrade>();

  useEffect(() => {
    fetch("/upgrades.json")
      .then(data => data.json())
      .then(upgrades => {
        setUpgrades(upgrades);
        setSelectedUpgrade(upgrades[0]);
      })
  }, [])

  const getUpgradeTotalCost = (upgrade: Upgrade): number => {
    return upgrade.costs.reduce((acc, cost) => acc + cost, 0);
  }

  if (!upgrades) {
    return null;
  }

  return (
    <div className="page-upgrades flex-column content-container" style={{ gap: 10 }}>
      <Box label="Upgrades (WIP)">
        {upgrades.map(upgrade => (
          <div className="upgrade flex-row align-center" onClick={() => setSelectedUpgrade(upgrade)} key={upgrade.name}>
            <Sprite
              type="upgrade"
              offset={[0, 0]}
              showBackground={false}
            />
            {upgrade.name}
          </div>
        ))}
      </Box>

      <Box label={selectedUpgrade?.name}>
        {selectedUpgrade && (
          <>
            {selectedUpgrade.desc}

            <div className="costs">
              {selectedUpgrade.costs.join(' / ')} (Total: {getUpgradeTotalCost(selectedUpgrade)})
            </div>
          </>
        )}
      </Box>
    </div>
  )
}