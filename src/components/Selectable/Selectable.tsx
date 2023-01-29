import { StyledCSS } from "@/styles";
import React from "react";
import { ClearButton, SelectableContainer } from "./SelectableStyled";

export interface SelectableProps {
	children: React.ReactNode;
	width?: StyledCSS["width"];
	height?: StyledCSS["height"];
	clearable?: boolean;
	onClick: () => void;
	onClear?: () => void;
}

export const Selectable = ({
	children,
	width,
	height,
	clearable = false,
	onClick,
	onClear,
}: SelectableProps): React.ReactElement => {
	return (
		<SelectableContainer onClick={onClick} css={{ width, height }}>
			{clearable && <ClearButton onClick={onClear} />}
			{children}
		</SelectableContainer>
	);
};
