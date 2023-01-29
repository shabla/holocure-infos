import { Cross2Icon } from "@radix-ui/react-icons";
import { styled, StyledCSS } from "@/styles";

export const BuildContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	gap: "$4",
});

export const SectionsContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	gap: "$4",
});

export const SectionContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignContent: "center",
	justifyContent: "center",
	gap: "$2",
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
	writingMode: "vertical-rl",
	textOrientation: "upright",
	borderLeft: "5px solid white",
	textAlign: "center",
});

export const SectionContent = styled("div", {
	display: "flex",
	flexDirection: "column",
	flex: "1 1 auto",
	alignItems: "center",
	justifyContent: "center",
});

const ClearButtonStyled = styled("button", {
	all: "unset",
	position: "absolute",
	top: 0,
	right: 0,
	transform: "translate(33%, -33%)",
	width: 20,
	height: 20,
	lineHeight: "20px",
	backgroundColor: "$pink",
	color: "white",
	zIndex: 20,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: "100%",
	boxShadow: "rgba(0,0,0,0.2) 1px 1px 2px",

	"&:hover": {
		backgroundColor: "White",
		color: "$darkBlue",
		cursor: "pointer",
	},

	"& svg": {
		transform: "translateY(-1px)",
	},
});

export function ClearButton({ onClick }: { onClick: () => void }) {
	return (
		<ClearButtonStyled
			onClick={(e) => {
				e.stopPropagation();
				onClick();
			}}
		>
			<Cross2Icon />
		</ClearButtonStyled>
	);
}

/* Stamps */
export const StampsContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	gap: 10,
});

export const StampContainer = styled("div", {
	border: "2px solid rgba(50,50,50,0.2)",
	backgroundColor: "rgba(100,100,100,0.5)",
	height: 60,
	width: 60,
	position: "relative",

	"&::before": {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		content: "'+'",
		color: "rgb(255,255,255,0.2)",
		fontSize: "60px",
		textAlign: "center",
	},
});

/* Weapons */
export const WeaponsContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	gap: "$4",
	marginBottom: "$4",
});

/* Items */
export const ItemsContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	gap: "$4",
});
