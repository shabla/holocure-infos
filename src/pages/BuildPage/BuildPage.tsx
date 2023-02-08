import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ItemIdsList, StampIdsList, WeaponIdsList } from "@/models";
import { ContentContainer, Builder } from "@/components";
import { Build } from "@/utils/Build";

export const BuildPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [idolId, setIdolId] = useState<number | undefined>(undefined);
	const [stampIds, setStampIds] = useState<StampIdsList>(Build.getStampIds());
	const [weaponIds, setWeaponIds] = useState<WeaponIdsList>(
		Build.getWeaponIds(),
	);
	const [itemIds, setItemIds] = useState<ItemIdsList>(Build.getItemIds());

	useEffect(() => {
		const buildIds = Build.parse(searchParams.get("b") || "");

		setIdolId(buildIds.idolId);
		setStampIds(buildIds.stampIds);
		setWeaponIds(buildIds.weaponIds);
		setItemIds(buildIds.itemIds);
	}, []);

	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		const buildIds = Build.generate(idolId, stampIds, weaponIds, itemIds);

		params.set("b", buildIds);

		setSearchParams(params);
	}, [idolId, stampIds, weaponIds, itemIds]);

	return (
		<ContentContainer
			css={{
				flexDirection: "column",
				gap: "15px",
			}}
		>
			<Builder
				idolId={idolId}
				stampIds={stampIds}
				weaponIds={weaponIds}
				itemIds={itemIds}
				onIdolChange={setIdolId}
				onStampsChange={setStampIds}
				onWeaponsChanged={setWeaponIds}
				onItemsChanged={setItemIds}
			/>

			{/* TODO: find a way to make this nicer */}
			{/* 
			<PageSections>
				<PageSection css={{ flex: "1 1 40%" }}>
					<IdolProfileBox idolId={idolId} />
				</PageSection>

        <PageSection css={{ flex: "1 1 60%" }}>
					<ItemDetailsBox
						item={selectedItem}
						onItemSelected={setSelectedItem}
					/>
				</PageSection> 
			</PageSections>
        */}
		</ContentContainer>
	);
};
