import * as RadixDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";
import {
	DialogCloseButton,
	DialogContent,
	DialogOverlay,
	DialogTitle,
} from "./DialogStyled";

export interface DialogProps {
	title?: string;
	open: boolean;
	setOpen: (value: boolean) => void;
	children?: React.ReactNode;
}

export const Dialog = ({
	open,
	setOpen,
	title,
	children,
}: DialogProps): React.ReactElement | null => {
	return (
		<RadixDialog.Root open={open} onOpenChange={setOpen}>
			<RadixDialog.Portal>
				<DialogOverlay>
					<DialogContent>
						{title && <DialogTitle>{title}</DialogTitle>}

						{children}

						<RadixDialog.Close asChild>
							<DialogCloseButton aria-label="Close">
								<Cross2Icon />
							</DialogCloseButton>
						</RadixDialog.Close>
					</DialogContent>
				</DialogOverlay>
			</RadixDialog.Portal>
		</RadixDialog.Root>
	);
};
