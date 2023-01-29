import { styled } from "@/styles";

export const InfoTable = styled("table", {
	$$lineHeight: "16px",

	width: "100%",
	borderSpacing: 0,

	"tr:nth-of-type(odd)": {
		backgroundColor: "rgba(0, 0, 0, 0.05)",
	},

	"tr:nth-of-type(even)": {
		backgroundColor: "rgba(0, 0, 0, 0.02)",
	},

	td: {
		padding: "$1",
		height: "calc($$lineHeight * 4 + 2 * $space$1)",
		lineHeight: "$$lineHeight",
	},

	"td.name": {
		fontWeight: "bold",
		whiteSpace: "nowrap",
		width: "100px",
	},

	"td.value.row": {
		display: "flex",
		gap: "10px",
	},

	variants: {
		small: {
			true: {
				td: {
					height: "auto",
				},
			},
		},
	},
});
