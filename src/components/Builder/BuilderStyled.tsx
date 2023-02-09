import { styled, StyledCSS } from "@/styles";

export const BuildContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	gap: "$4",
});

export const ResetButton = styled("button", {
	unset: "all",
	padding: "$2 $4",
	fontSize: "16px",
	backgroundColor: "$darkBlue",
	color: "white",
	border: 0,
	borderRadius: "5px",
	"&:hover": {
		backgroundColor: "$blue",
		cursor: "pointer",
	},
});

export const SectionsContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	gap: "$4",
});

export const SectionContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignContent: "center",
	justifyContent: "center",
	gap: "$2",

	"@bp1": {
		flexDirection: "row",
	},
});

export function Section({
	title,
	children,
	css,
	contentCss,
}: {
	title: string;
	children: React.ReactNode;
	css?: StyledCSS;
	contentCss?: StyledCSS;
}) {
	return (
		<SectionContainer css={css}>
			<SectionName>{title}</SectionName>
			<SectionContent css={contentCss}>{children}</SectionContent>
		</SectionContainer>
	);
}

export const SectionName = styled("div", {
	textAlign: "center",
	border: 0,
	borderBottom: "5px solid white",

	"@bp1": {
		writingMode: "vertical-rl",
		textOrientation: "upright",
		border: 0,
		borderLeft: "5px solid white",
	},
});

export const SectionContent = styled("div", {
	display: "flex",
	flexDirection: "column",
	flex: "1 1 auto",
	alignItems: "center",
	justifyContent: "center",
	gap: "$4",
});

export const EmptyMessage = styled("div", {
	fontSize: "12px",
	textAlign: "center",
});

/* Stamps */
export const StampsContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	gap: 10,
});

export const StampContainer = styled("div", {
	height: 40,
	width: 40,
});
