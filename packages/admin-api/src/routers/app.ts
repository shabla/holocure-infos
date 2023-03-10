import { router } from "../trpc";
import { upgradesRouter } from "./upgrades";

export const appRouter = router({
	upgrades: upgradesRouter,
});

// Export type router type signature, NOT the router itself.
export type AppRouter = typeof appRouter;
