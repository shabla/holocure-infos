export class Api {
	static baseUrl = "http://localhost:5000";
	static headers: HeadersInit = {
		"Content-Type": "application/json",
	};

	static toPath = (path: string): string => {
		return `${this.baseUrl}${path}`;
	};

	static get = async <ResponseType>(path: string): Promise<ResponseType> => {
		const response = await fetch(this.toPath(path), {
			method: "GET",
			headers: this.headers,
		});
		return await response.json();
	};

	static post = async <ResponseType>(
		path: string,
		body?: BodyInit,
	): Promise<ResponseType> => {
		const response = await fetch(this.toPath(path), {
			method: "POST",
			headers: this.headers,
			body,
		});
		return await response.json();
	};
}
