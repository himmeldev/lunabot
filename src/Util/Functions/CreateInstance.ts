import { D, DData } from "../TypeScript/Interfaces";

export const CreateInstance = (d: D, data: DData) => {
	const NewInstance = d;

	Object.assign(NewInstance, data);

	return NewInstance;
};
