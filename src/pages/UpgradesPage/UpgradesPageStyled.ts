import { alignCrossCenter, styled, tableCellMinContent } from "@/styles";

export const Table = styled("table", {
  borderCollapse: "collapse",
  "td,th": {
    verticalAlign: "middle",
  },
});
export const NameCol = styled("td", { paddingLeft: "$2", textAlign: "left" });
export const DescCol = styled("td", { minWidth: "300px" });
export const RanksCol = styled("td", tableCellMinContent);
export const TotalCol = styled(
  "td",
  { textAlign: "right" },
  tableCellMinContent
);
export const RanksContainer = styled(
  "div",
  { display: "flex", flexDirection: "row" },
  alignCrossCenter
);
