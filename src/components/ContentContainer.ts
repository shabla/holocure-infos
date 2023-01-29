import { alignCrossCenter, styled } from "@/styles";

export const ContentContainer = styled(
	"div",
	{
		maxWidth: "1300px",
		width: "100%",
		margin: "0 auto",
		position: "relative",
		gap: "$2",
		display: "flex",
		flexDirection: "row",
	},
	alignCrossCenter,
);
