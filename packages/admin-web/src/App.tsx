import { useState } from "react";
import { trpc } from "./utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { UpgradesPage } from "./pages/UpgradesPage";

export function App() {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: "http://localhost:5000/trpc",
				}),
			],
		}),
	);

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<div className="App">
					<UpgradesPage />
				</div>
			</QueryClientProvider>
		</trpc.Provider>
	);
}
