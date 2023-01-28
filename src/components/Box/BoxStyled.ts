import { styled } from "@/styles";

export const BoxContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	width: "100%",
	border: "1px solid white",
	borderTop: 0,
	backgroundColor: "rgba(0, 0, 0, 0.13)",
});

export const BoxHeader = styled("header", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
	minHeight: "56px",
	backgroundColor: "white",
	fontWeight: 300,
	fontSize: "22px",
	color: "$blue",
	textTransform: "uppercase",
	padding: "0 10px",
});

export const BoxContent = styled("main", {
	display: "flex",
	flexDirection: "column",
	flex: "1 1 auto",
	padding: "$2",
	color: "white",
	fontSize: "16px",
	overflowY: "auto",
});
