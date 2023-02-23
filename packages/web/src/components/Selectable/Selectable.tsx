import { StyledCSS } from "@holocure-builds/common";
import React from "react";
import { ClearButton, SelectableContainer } from "./SelectableStyled";

export interface SelectableProps {
	children: React.ReactNode;
	clearable?: boolean;
	disabled?: boolean;
	selected?: boolean;
	css?: StyledCSS;
	onClick?: () => void;
	onClear?: () => void;
}

export const Selectable = ({
	children,
	clearable = false,
	disabled = false,
	selected = false,
	css,
	onClick,
	onClear,
}: SelectableProps): React.ReactElement => {
	return (
		<SelectableContainer
			onClick={disabled ? undefined : onClick}
			disabled={disabled}
			selected={selected}
			css={css}
		>
			{clearable && <ClearButton onClick={onClear} />}
			{children}
		</SelectableContainer>
	);
};
