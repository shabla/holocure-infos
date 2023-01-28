import { styled } from "@/styles";

export const IdolGenerationsContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	flexWrap: "wrap",
	flex: "0 0 auto",
	width: 470,
	gap: "$4 $2",
});

export const IdolGenerationName = styled("div", {
	color: "white",
	borderBottom: "1px solid white",
	fontSize: "20px",
	lineHeight: "20px",
	marginBottom: "$1",
	textTransform: "uppercase",
});
