import * as RadixDialog from "@radix-ui/react-dialog";
import { contentShow, fadeIn, styled } from "@/styles";

export const DialogOverlay = styled(RadixDialog.Overlay, {
	backgroundColor: "hsl(0 0% 0% / 0.439)",
	position: "fixed",
	inset: 0,
	animation: `${fadeIn} 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

export const DialogContent = styled(RadixDialog.Content, {
	backgroundColor: "$blue",
	borderRadius: 6,
	boxShadow:
		"hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	maxWidth: "90vw",
	maxHeight: "85vh",
	padding: "35px",
	animation: `${contentShow} 300ms cubic-bezier(0.16, 1, 0.3, 1)`,

	"&:focus": {
		outline: "none",
	},
});

export const DialogTitle = styled(RadixDialog.Title, {
	margin: 0,
	marginBottom: "$3",
	fontWeight: 500,
	fontSize: "32px",
	color: "white",
});

export const DialogCloseButton = styled(RadixDialog.Description, {
	all: "unset",
	fontFamily: "inherit",
	borderRadius: "100%",
	height: 25,
	width: 25,
	lineHeight: "25px",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	color: "white",
	position: "absolute",
	top: "10px",
	right: "10px",
	cursor: "pointer",

	"&:hover": {
		backgroundColor: "white",
		color: "$darkBlue",
	},
});
