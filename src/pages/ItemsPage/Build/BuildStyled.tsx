import { Cross2Icon } from "@radix-ui/react-icons";
import { styled, StyledCSS } from "@/styles";

export const BuildContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
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
	width: 25,
	height: 25,
	lineHeight: "20px",
	backgroundColor: "$pink",
	color: "white",
	zIndex: 20,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: "100%",
	boxShadow: "rgba(0,0,0,0.2) 1px 1px 1px",

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
			className="ClearButton"
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
	height: 40,
	width: 40,
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
