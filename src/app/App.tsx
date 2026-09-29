import { AppStoreProvider } from "@/store"
import type { FC, JSX } from "react"
import { AppContent } from "./AppContent"

export const App: FC = (): JSX.Element => {
	return (
		<AppStoreProvider>
			<AppContent />
		</AppStoreProvider>
	)
}
