import { TextInput } from "@/components/TextInput";
import { Upgrade } from "@holocure-builds/common";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ErrorMessage } from "@hookform/error-message";

interface UpgradeFormProps {
	upgrade: Upgrade;
	onSave: (upgrade: Upgrade) => void;
	onDelete: (upgrade: Upgrade) => void;
}

const validationSchema = z.object({
	icon: z.string().min(2),
	name: z.string().min(2),
	desc: z.string().min(2),
	costs: z.array(z.number().int().nonnegative().finite().safe()).nonempty(),
});

type FormValues = z.infer<typeof validationSchema>;

export function UpgradeEditor({ upgrade, onSave, onDelete }: UpgradeFormProps) {
	const { register, handleSubmit, formState, reset, control } =
		useForm<FormValues>({
			criteriaMode: "all",
			resolver: zodResolver(validationSchema),
		});

	useEffect(() => {
		reset({
			icon: upgrade.icon,
			name: upgrade.name,
			desc: upgrade.desc,
			costs: upgrade.costs,
		});
	}, [upgrade]);

	const handleSave: SubmitHandler<FormValues> = (values: FormValues) => {
		const changedUpgrade: Upgrade = {
			...upgrade,
			...values,
		};

		onSave(changedUpgrade);
	};

	return (
		<form onSubmit={handleSubmit(handleSave)}>
			<div className="UpgradeEditor">
				<TextInput value={`${upgrade.$loki}`} disabled />

				<TextInput
					placeholder="Icon name"
					className={formState.dirtyFields.icon ? "dirty" : undefined}
					{...register("icon")}
				/>

				<TextInput
					placeholder="Name"
					className={formState.dirtyFields.name ? "dirty" : undefined}
					{...register("name")}
				/>

				<TextInput
					placeholder="Description"
					className={formState.dirtyFields.desc ? "dirty" : undefined}
					{...register("desc")}
				/>

				{/* <Errors
					label="Desc"
					control={control}
					error={formState.errors.desc}
					{...register("desc")}
				/> */}

				<TextInput
					placeholder="Costs"
					className={formState.dirtyFields.costs ? "dirty" : undefined}
					{...register("costs", {
						setValueAs: (v) => {
							if (typeof v === "string") {
								const res = v
									.split(",")
									.map((str) => parseInt(str, 10))
									.filter((nb) => !isNaN(nb));
								return res;
							}
							return v;
						},
					})}
				/>

				<button
					type="button"
					disabled={!formState.isDirty}
					onClick={() => reset()}
				>
					Reset
				</button>

				<button type="submit" disabled={!formState.isDirty}>
					Save
				</button>

				<button type="button" onClick={() => onDelete(upgrade)}>
					Delete
				</button>
			</div>
		</form>
	);
}
