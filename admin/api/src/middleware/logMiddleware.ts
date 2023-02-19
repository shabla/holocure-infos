import express from "express";

export function logMiddleware(
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) {
	console.log(`[${req.method}] ${req.path}`);

	next();
}
