import { useAppDispatch, useAppSelector } from "../../../store/appStore"
import { layerConfig } from "../config"

export function LayerPanel() {
	const dispatch = useAppDispatch()

	const { activeLayerIds } = useAppSelector((state) => ({
		activeLayerIds: state.activeLayers,
	}))

	const toggleLayer = (layerId: string) => {
		const isActive = activeLayerIds.includes(layerId)

		dispatch({
			activeLayers: isActive
				? activeLayerIds.filter((id) => id !== layerId)
				: [...activeLayerIds, layerId],
		})
	}

	return (
		<section className="rounded-xl bg-white p-4 shadow">
			<h2 className="mb-3 text-lg font-semibold">Слои карты</h2>

			<div className="space-y-3">
				{layerConfig.map((layer) => (
					<label
						key={layer.id}
						className="flex cursor-pointer items-center gap-3"
					>
						<input
							type="checkbox"
							checked={activeLayerIds.includes(layer.id)}
							onChange={() => toggleLayer(layer.id)}
							className="h-4 w-4 accent-blue-600"
						/>

						<span className="text-sm text-gray-700">{layer.name}</span>

						<span className="ml-auto text-xs text-gray-500">{layer.unit}</span>
					</label>
				))}
			</div>
		</section>
	)
}
