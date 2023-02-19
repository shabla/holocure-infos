import { styled } from "@/styles";

export const SpriteListContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	gap: "$2",
});

export const IdolGenerationsContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	flexWrap: "wrap",
	flex: "0 0 auto",
	width: 470,
	gap: "$4 $2",
});

export const IdolGenerationName = styled("div", {
	borderBottom: "1px solid",
	fontSize: "20px",
	lineHeight: "20px",
	marginBottom: "$1",
	textTransform: "uppercase",
	color: "white",
});
