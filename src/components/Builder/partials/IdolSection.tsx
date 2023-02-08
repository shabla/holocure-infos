import { IdolPickerDialog, Selectable, Sprite } from "@/components";
import { useDialogState } from "@/hooks/useDialogState";
import { Idol } from "@/models";
import React from "react";
import { EmptyMessage, Section } from "../BuilderStyled";

export interface IdolSectionProps {
	idol?: Idol;
	onChange: (idolId?: number) => void;
}

export const IdolSection = ({
	idol,
	onChange,
}: IdolSectionProps): React.ReactElement => {
	const idolDialog = useDialogState();

	const handleIdolChange = (idol?: Idol) => {
		idolDialog.close();

		onChange(idol?.id);
	};

	return (
		<Section title="Idol">
			<IdolPickerDialog
				idol={idol}
				open={idolDialog.isOpen}
				setOpen={idolDialog.setIsOpen}
				onChange={handleIdolChange}
			/>

			<Selectable
				width={150}
				height={120}
				onClick={idolDialog.open}
				onClear={() => handleIdolChange(undefined)}
				clearable={!!idol}
			>
				{idol ? (
					<Sprite
						type="idols-icon"
						name={idol.name}
						label={idol.name}
						alwaysIncludeLabelPadding
					/>
				) : (
					<EmptyMessage>Pick an idol</EmptyMessage>
				)}
			</Selectable>
		</Section>
	);
};
