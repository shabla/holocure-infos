import * as RadixDialog from "@radix-ui/react-dialog";
import { contentShow, fadeIn, styled } from "@holocure-builds/common";

export const DialogOverlay = styled(RadixDialog.Overlay, {
	position: "fixed",
	backgroundColor: "hsl(0 0% 0% / 0.439)",
	animation: `${fadeIn} 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	zIndex: 100,
	display: "grid",
	placeItems: "center",
	overflowY: "auto",
});

export const DialogContainer = styled(RadixDialog.Content, {
	backgroundColor: "$blue",
	boxShadow: `
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px, 
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px
  `,
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	maxWidth: "90vw",
	maxHeight: "95vh",
	overflowY: "auto",
	display: "flex",
	flexDirection: "column",
	animation: `${contentShow} 350ms cubic-bezier(0.16, 1, 0.3, 1)`,
	border: "1px solid white",

	"&:focus": {
		outline: "none",
	},
});

export const DialogTitle = styled(RadixDialog.Title, {
	margin: 0,
	fontWeight: 500,
	fontSize: "32px",
	backgroundColor: "white",
	color: "$blue",
	width: "100%",
	padding: "0 $4",
	height: 70,
	lineHeight: "70px",
});

export const DialogContent = styled("div", {
	width: "100%",
	padding: "$4",
	color: "white",
	overflowY: "auto",
});

export const DialogCloseButton = styled(RadixDialog.Description, {
	all: "unset",
	position: "absolute",
	fontFamily: "inherit",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	color: "$blue",
	borderRadius: "100%",
	top: 70 / 2,
	right: "$4",
	transform: "translateY(-50%)",
	height: 25,
	width: 25,
	lineHeight: "25px",

	"&:hover": {
		cursor: "pointer",
		backgroundColor: "$blue",
		color: "white",
	},
});
