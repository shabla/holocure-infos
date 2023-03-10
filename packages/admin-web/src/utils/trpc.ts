import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@holocure-builds/admin-api/src/routers/app";

export const trpc = createTRPCReact<AppRouter>();
