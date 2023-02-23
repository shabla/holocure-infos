import { styled, tableCellMinContent } from "@holocure-builds/common";

export const Table = styled("table", {
	borderCollapse: "collapse",
	"td,th": {
		verticalAlign: "middle",
	},
	tbody: {
		"tr:nth-of-type(odd)": {
			backgroundColor: "rgba(0,0,0,0.05)",
		},
		td: {
			padding: "$1 $2",
		},
	},
});

export const NameCol = styled("td", {
	paddingLeft: "$2",
	textAlign: "left",
});

export const DescCol = styled("td", {
	minWidth: "300px",
});

export const RanksCol = styled("td", {});

export const RanksContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	width: "100%",
});

export const TotalCol = styled("td", {
	textAlign: "right",
	width: "auto",
});
