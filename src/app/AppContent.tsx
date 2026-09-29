import { useAppSelector } from "../store/appStore"

import { LayerPanel } from "@/features/layers/components/LayerPoints"
import { LayerDataLoader } from "../features/layers/components/LayerDataLoader"
import { MapView } from "../features/map/components/MapView"
import { Timeline } from "../features/timeline/components/Timeline"

export const AppContent = () => {
	const { isLoading, error } = useAppSelector((state) => ({
		isLoading: state.isLoading,
		error: state.error,
	}))

	return (
		<>
			<LayerDataLoader />

			<main className="min-h-screen bg-gray-100 p-6">
				<div className="mx-auto max-w-6xl space-y-6">
					<header>
						<h1 className="text-2xl font-bold text-gray-900">Map Layers</h1>

						<p className="mt-1 text-sm text-gray-500">
							Управление временными геоданными
						</p>
					</header>

					<LayerPanel />

					<div className="relative">
						<MapView />

						{isLoading && (
							<div className="absolute right-4 top-4 rounded-lg bg-white px-4 py-2 text-sm shadow">
								Загрузка данных...
							</div>
						)}

						{error && (
							<div className="absolute left-4 top-4 rounded-lg bg-white px-4 py-2 text-sm text-red-600 shadow">
								{error}
							</div>
						)}
					</div>

					<Timeline />
				</div>
			</main>
		</>
	)
}
