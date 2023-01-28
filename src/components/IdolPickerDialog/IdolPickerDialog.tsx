import React, { useState } from "react";
import { Dialog, IdolGenerations, IdolSkillBox } from "@/components";
import { Idol } from "@/models";
import { styled } from "@/styles";

export interface IdolPickerDialogProps {
	idol?: Idol;
	open: boolean;
	setOpen: (value: boolean) => void;
	onChange: (idol: Idol) => void;
}

const DialogContent = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "start",
	gap: 20,
});

export const IdolPickerDialog = ({
	idol,
	open,
	setOpen,
	onChange,
}: IdolPickerDialogProps): React.ReactElement => {
	const [visibleIdol, setVisibleIdol] = useState<Idol | undefined>(idol);

	return (
		<Dialog title="Pick an idol" open={open} setOpen={setOpen}>
			<DialogContent>
				<IdolGenerations
					selectedIdol={idol}
					onSelected={onChange}
					onIdolOver={setVisibleIdol}
					// onIdolOut={() => setVisibleIdol(undefined)}
				/>
				<IdolSkillBox
					title={visibleIdol?.name || ""}
					skills={visibleIdol ? [visibleIdol.attack] : undefined}
				/>
			</DialogContent>
		</Dialog>
	);
};
