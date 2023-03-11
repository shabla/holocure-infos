import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import {
	Controller,
	FieldError,
	FieldValues,
	UseControllerProps,
} from "react-hook-form";

// interface ErrorsProps<T> extends UseControllerProps<T> {
// 	error: FieldError | undefined;
// 	label?: string;
// }

// export const Errors = <T extends FieldValues>({
// 	name,
// 	label,
// 	control,
// }: ErrorsProps<T>) => {
// 	return (
// 		<Controller
// 			name={name}
// 			control={control}
// 			render={({
// 				field,
// 				fieldState: { invalid, isTouched, isDirty, error },
// 				formState,
// 			}) => (
// 				<div style={{ display: "flex", flexDirection: "column" }}>
// 					<label style={{ display: "flex", flexDirection: "column" }}>
// 						{label}
// 						<TextInput {...field} />
// 					</label>

// 					<ErrorMessage
// 						name={name}
// 						errors={formState.errors}
// 						render={({ messages }) =>
// 							messages &&
// 							Object.entries(messages).map(([type, message]) => (
// 								<p key={type}>{message}</p>
// 							))
// 						}
// 					/>
// 				</div>
// 			)}
// 		/>
// 	);
// };

interface TextInputProps
	extends Partial<
		React.DetailedHTMLProps<
			React.InputHTMLAttributes<HTMLInputElement>,
			HTMLInputElement
		>
	> {}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
	function TextInput(
		{ className = "", type = "text", ...inputProps }: TextInputProps,
		ref,
	) {
		return (
			<input
				type={type}
				className={`TextInput ${className}`}
				{...inputProps}
				ref={ref}
			/>
		);
	},
);
