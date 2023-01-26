import { useEffect } from "react";

import { Box, ContentContainer, Sprite } from "@/components";
import { Upgrade } from "@/models";
import { useUpgradesStore } from "@/stores";
import { styled, alignCrossCenter, tableCellMinContent } from "@/styles";

const Table = styled("table", {
  borderCollapse: "collapse",
  "td,th": {
    verticalAlign: "middle",
  },
});
const NameCol = styled("td", { paddingLeft: "$2", textAlign: "left" });
const DescCol = styled("td", { minWidth: "300px" });
const RanksCol = styled("td", tableCellMinContent);
const TotalCol = styled("td", { textAlign: "right" }, tableCellMinContent);
const RanksContainer = styled(
  "div",
  { display: "flex", flexDirection: "row" },
  alignCrossCenter
);

export const UpgradesPage = () => {
  const [loaded, upgrades, loadUpgrades] = useUpgradesStore((state) => [
    state.loaded,
    state.upgrades,
    state.loadUpgrades,
  ]);

  useEffect(() => {
    loadUpgrades();
  }, []);

  const getUpgradeTotalCost = (upgrade: Upgrade): number => {
    return upgrade.costs.reduce((acc, cost) => acc + cost, 0);
  };

  if (!loaded) {
    return null;
  }

  return (
    <ContentContainer
      css={{ gap: "$2", display: "flex", flexDirection: "row" }}
    >
      <Box label="Upgrades">
        <Table>
          <thead>
            <tr>
              <th></th>
              <NameCol as="th">Name</NameCol>
              <DescCol as="th">Description</DescCol>
              <RanksCol as="th">Ranks</RanksCol>
              <TotalCol as="th">Total Cost</TotalCol>
            </tr>
          </thead>

          <tbody>
            {(() => {
              let total = 0;
              return (
                <>
                  {upgrades.map((upgrade) => {
                    const upgradeTotal = getUpgradeTotalCost(upgrade);
                    total += upgradeTotal;

                    return (
                      <tr key={upgrade.name}>
                        <td>
                          <Sprite
                            type="upgrades"
                            name={upgrade.name}
                            showBackground={false}
                          />
                        </td>

                        <NameCol>{upgrade.name}</NameCol>

                        <DescCol>{upgrade.desc}</DescCol>

                        <RanksCol>
                          <RanksContainer>
                            <Sprite
                              type="upgrades"
                              name="Money Gain Up"
                              scale={0.5}
                            />
                            {upgrade.costs
                              .map((cost) => cost.toLocaleString())
                              .join(" / ")}
                          </RanksContainer>
                        </RanksCol>

                        <TotalCol>{upgradeTotal.toLocaleString()}</TotalCol>
                      </tr>
                    );
                  })}

                  <tr key="total min-content">
                    <TotalCol colSpan={4} style={{ paddingRight: "10px" }}>
                      <b>Total:</b>
                    </TotalCol>
                    <TotalCol>{total.toLocaleString()}</TotalCol>
                  </tr>
                </>
              );
            })()}
          </tbody>
        </Table>
      </Box>
    </ContentContainer>
  );
};
