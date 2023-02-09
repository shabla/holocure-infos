import { Box } from "@/components";
import { ItemIdsList, StampIdsList, WeaponIdsList } from "@/models";
import { useIdolsStore } from "@/stores";
import { Build } from "@/utils/Build";
import { useMemo } from "react";
import {
	BuildContainer,
	SectionsContainer,
	ResetButton,
} from "./BuilderStyled";
import { StampsSection } from "./partials/StampsSection";
import { IdolSection } from "./partials/IdolSection";
import { ItemsSection } from "./partials/ItemsSection";
import { WeaponsSection } from "./partials/WeaponsSection";

export interface BuilderProps {
	idolId?: number;
	stampIds: StampIdsList;
	weaponIds: WeaponIdsList;
	itemIds: ItemIdsList;
	onIdolChange: (idolId?: number) => void;
	onStampsChange: (stampIds: StampIdsList) => void;
	onWeaponsChanged: (weaponIds: WeaponIdsList) => void;
	onItemsChanged: (itemIds: ItemIdsList) => void;
}

export const Builder = ({
	idolId,
	stampIds,
	weaponIds,
	itemIds,
	onIdolChange,
	onStampsChange,
	onWeaponsChanged,
	onItemsChanged,
}: BuilderProps): React.ReactElement => {
	const idol = useIdolsStore((state) =>
		useMemo(() => state.getIdolById(idolId), [idolId]),
	);

	const handleReset = () => {
		onIdolChange(undefined);
		onStampsChange(Build.getStampIds());
		onWeaponsChanged(Build.getWeaponIds());
		onItemsChanged(Build.getItemIds());
	};

	return (
		<Box
			label={
				<>
					<span>Build</span>

					<ResetButton type="button" onClick={handleReset}>
						Reset
					</ResetButton>
				</>
			}
		>
			<BuildContainer
				css={{
					"@bp3": { flexDirection: "row" },
				}}
			>
				<SectionsContainer
					css={{
						"@bp1": { flexDirection: "row" },
						"@bp3": { flexDirection: "column" },
					}}
				>
					<IdolSection idol={idol} onChange={onIdolChange} />

					<StampsSection
						attack={idol?.attack}
						stampIds={stampIds}
						onChange={onStampsChange}
					/>
				</SectionsContainer>

				<SectionsContainer css={{ flex: "1 1 auto" }}>
					<WeaponsSection weaponIds={weaponIds} onChange={onWeaponsChanged} />

					<ItemsSection itemIds={itemIds} onChange={onItemsChanged} />
				</SectionsContainer>
			</BuildContainer>
		</Box>
	);
};
