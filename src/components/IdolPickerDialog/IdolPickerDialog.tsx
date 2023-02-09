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
	gap: "$2",
	minHeight: "700px",
});

export const IdolPickerDialog = ({
	idol,
	open,
	setOpen,
	onChange,
}: IdolPickerDialogProps): React.ReactElement => {
	const [visibleIdol, setVisibleIdol] = useState<Idol | undefined>(idol);

	return (
		<Dialog open={open} setOpen={setOpen} title="Idol">
			<DialogContent>
				{/* TODO: find a nice way to display this */}
				{/* <IdolSkillBox
					title={visibleIdol?.name || ""}
					skills={visibleIdol ? [visibleIdol.attack] : undefined}
				/> */}
				<IdolGenerations
					selectedIdol={idol}
					onSelected={onChange}
					onIdolOver={setVisibleIdol}
				/>
			</DialogContent>
		</Dialog>
	);
};
