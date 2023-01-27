import { styled } from "@/styles";

export const InfoTable = styled("table", {
	width: "100%",
	borderSpacing: 0,

	"tr:nth-of-type(odd)": {
		backgroundColor: "rgba(0, 0, 0, 0.05)",
	},

	"tr:nth-of-type(even)": {
		backgroundColor: "rgba(0, 0, 0, 0.02)",
	},

	td: {
		padding: "$2",
	},

	"td.name": {
		fontWeight: "bold",
		whiteSpace: "nowrap",
		width: "120px",
	},
});
