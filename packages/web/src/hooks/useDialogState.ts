import { useState } from "react";

export const useDialogState = <T extends unknown>(defaultData?: T) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [data, setData] = useState<T | undefined>(defaultData);

	const open = (data?: T) => {
		setIsOpen(true);
		setData(data);
	};

	const close = () => {
		setIsOpen(false);
		setData(undefined);
	};

	return {
		isOpen,
		setIsOpen,
		data,
		setData,
		open,
		close,
	};
};
