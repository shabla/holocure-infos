import { StyledCSS } from "@/styles";
import * as RadixDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";
import {
	DialogContent,
	DialogCloseButton,
	DialogContainer,
	DialogOverlay,
	DialogTitle,
} from "./DialogStyled";

export interface DialogProps {
	title?: string;
	open: boolean;
	contentCss?: StyledCSS;
	children?: React.ReactNode;
	setOpen: (value: boolean) => void;
}

export const Dialog = ({
	open,
	setOpen,
	title,
	contentCss,
	children,
}: DialogProps): React.ReactElement | null => {
	return (
		<RadixDialog.Root open={open} onOpenChange={setOpen}>
			<RadixDialog.Portal>
				<DialogOverlay>
					<DialogContainer>
						{title && <DialogTitle>{title}</DialogTitle>}

						<DialogContent css={contentCss}>{children}</DialogContent>

						<RadixDialog.Close asChild>
							<DialogCloseButton aria-label="Close">
								<Cross2Icon />
							</DialogCloseButton>
						</RadixDialog.Close>
					</DialogContainer>
				</DialogOverlay>
			</RadixDialog.Portal>
		</RadixDialog.Root>
	);
};
