import { slideDown, slideUp, styled } from "@/styles";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronUpIcon } from "@radix-ui/react-icons";

export const Tabs = styled("div", {
	position: "relative",
	backgroundColor: "$darkBlue",
	display: "flex",
	flexDirection: "row",
	height: 40,
});

export const Tab = styled("button", {
	all: "unset",
	color: "white",
	padding: "$2 $4",
	cursor: "pointer",

	variants: {
		selected: {
			true: {
				background: "white",
				color: "$darkBlue",
				fontWeight: 700,
			},
		},
	},
});

const CloseButton = styled("div", {
	unset: "all",
	position: "absolute",
	top: 0,
	right: 0,
	height: 40,
	width: 40,
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",

	svg: {
		display: "block",
		height: 30,
		width: 30,
	},

	"&:hover": {
		cursor: "pointer",
		backgroundColor: "rgba(255,255,255,0.1)",
	},
});

export const TabCloseButton = (
	props: Pick<React.HTMLProps<HTMLDivElement>, "onClick">,
) => (
	<CloseButton {...props}>
		<ChevronUpIcon />
	</CloseButton>
);

export const WeaponPickerContainer = styled(Collapsible.Content, {
	border: "1px solid white",
	backgroundColor: "$darkBlueHalfOpacity",
	overflow: "hidden",

	"&[data-state=open]": {
		animation: `${slideDown} 300ms ease-out`,
	},

	"&[data-state=closed]": {
		animation: `${slideUp} 300ms ease-out`,
	},
});

export const ItemsContainer = styled("div", {
	padding: "$3",
});
