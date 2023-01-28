import React from "react";
import { BoxContainer, BoxHeader, BoxContent } from "./BoxStyled";

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
	label?: React.ReactNode;
}

export const Box = ({ label, children, ...props }: BoxProps) => {
	return (
		<BoxContainer {...props}>
			<BoxHeader>{label}</BoxHeader>
			<BoxContent>{children}</BoxContent>
		</BoxContainer>
	);
};
