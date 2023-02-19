import { styled } from "@/styles";
import { Cross2Icon } from "@radix-ui/react-icons";

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
		backgroundColor: "white",
		color: "$darkBlue",
		cursor: "pointer",
	},

	"& svg": {
		transform: "translateY(-1px)",
	},
});

export function ClearButton({ onClick }: { onClick?: () => void }) {
	return (
		<ClearButtonStyled
			onClick={
				onClick
					? (e) => {
							e.stopPropagation();
							onClick();
					  }
					: undefined
			}
		>
			<Cross2Icon />
		</ClearButtonStyled>
	);
}
ClearButton.toString = () => ".ClearButton";

export const SelectableContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "rgba(255,255,255,0.1)",
	padding: "$2",
	borderRadius: "3px",
	position: "relative",

	[`& ${ClearButtonStyled}`]: {
		display: "none",
	},

	variants: {
		disabled: {
			false: {
				"&:hover": {
					backgroundColor: "rgba(255,255,255,0.3)",
					cursor: "pointer",

					[`${ClearButtonStyled}`]: {
						display: "flex",
					},
				},
			},
		},
		selected: {
			true: {
				outline: "3px solid white",
			},
		},
	},
});
