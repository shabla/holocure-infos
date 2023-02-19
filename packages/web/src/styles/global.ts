import { globalCss, css } from "@/styles";

export const globalStyles = globalCss({
	"html, #root, body": {
		fontSize: "10px",
		minHeight: "100vh",
		backgroundColor: "$blue",
	},
	body: {
		fontSize: "1.6rem",
	},
	"*": {
		boxSizing: "border-box",
		fontFamily: "monospace",
	},
	"h1,h2,h3,h4,h5,h6": {
		margin: 0,
	},
});

// --content-padding: 5px; space.content

// .sticky {
//   position: sticky;
//   top: calc(var(--navbar-height) + var(--content-padding));
// }
export const sticky = css({
	position: "sticky",
	top: "calc(var(--navbarHeight) + var(--contentPadding))",
});

export const highlight = css({
	color: "#bcff5c",
	fontWeight: "bold",
});

export const tableCellMinContent = css({ width: "1%", whiteSpace: "nowrap" });
