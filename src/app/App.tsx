import { AppStoreProvider } from "@/store"
import type { FC, JSX } from "react"

export const App: FC = (): JSX.Element => {
	return (
		<AppStoreProvider>
			<main className="text-4xl text-red-900">awd</main>
		</AppStoreProvider>
	)
}
