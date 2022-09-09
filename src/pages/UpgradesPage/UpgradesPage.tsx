import { useEffect, useState } from "react";
import classNames from "classnames";

import { Box, Sprite } from "@/components";
import { Upgrade } from "@/models";
import { useUpgradesStore } from "@/stores";

import "./UpgradesPage.scss";

export const UpgradesPage = () => {
  const [loaded, upgrades, loadUpgrades] = useUpgradesStore(state => [
    state.loaded,
    state.upgrades,
    state.loadUpgrades
  ]);

  useEffect(() => {
    loadUpgrades();
  }, [])

  const getUpgradeTotalCost = (upgrade: Upgrade): number => {
    return upgrade.costs.reduce((acc, cost) => acc + cost, 0);
  }

  if (!loaded) {
    return null;
  }

  return (
    <div className="upgrades-page flex-row content-container gap-10">
      <Box label="Upgrades" className="upgrades">
        <table>
          <thead>
            <tr>
              <th></th>
              <th className="name">Name</th>
              <th className="desc">Description</th>
              <th className="upgrades">Upgrades</th>
              <th className="total text-right">Total Cost</th>
            </tr>
          </thead>

          <tbody>
            {(() => {
              let total = 0;
              return (
                <>
                  {upgrades.map(upgrade => {
                    const upgradeTotal = getUpgradeTotalCost(upgrade);
                    total += upgradeTotal;

                    return (
                      <tr key={upgrade.name} className="upgrade">
                        <td>
                          <Sprite
                            type="upgrades"
                            name={upgrade.name}
                            showBackground={false}
                          />
                        </td>

                        <td className="name min-content">{upgrade.name}</td>

                        <td className="desc">{upgrade.desc}</td>

                        <td className="upgrades min-content">
                          <div className="flex-row align-x-center">
                            <Sprite
                              type="upgrades"
                              name="Money Gain Up"
                              scale={0.5}
                            />
                            {upgrade.costs
                              .map(cost => cost.toLocaleString())
                              .join(' / ')
                            }
                          </div>
                        </td>

                        <td className="total min-content text-right">{upgradeTotal.toLocaleString()}</td>
                      </tr>
                    )
                  })}

                  <tr key="total min-content">
                    <td colSpan={4} className="text-right"><b>Total:</b></td>
                    <td className="total text-right">{total.toLocaleString()}</td>
                  </tr>
                </>
              );
            })()}

          </tbody>
        </table>
      </Box>
    </div >
  )
}