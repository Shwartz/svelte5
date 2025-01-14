type FormDataEntryValue = string | File;

export interface Todo {
	id: string;
	[key: string]: FormDataEntryValue | string | boolean;
	done: boolean;
}
