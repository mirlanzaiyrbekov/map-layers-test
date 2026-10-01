import { layerConfig } from "@/features/layers/config"
import type { ILayerData } from "./data"

export function layerDataToGeoJson(layerData: ILayerData) {
	return {
		type: "FeatureCollection" as const,
		features: layerData.data.map((item) => ({
			type: "Feature" as const,
			geometry: {
				type: "Point" as const,
				coordinates: [item.point.lng, item.point.lat],
			},
			properties: {
				layerId: layerData.layerId,
				value: item.value,
				timeId: layerData.time.id,
				color:
					layerConfig.find((layer) => layer.id === layerData.layerId)?.color ??
					"rgba(107, 114, 128, 0.7)",
				radius: Math.max(10, Math.min(25, item.value / 2 + 10)),
			},
		})),
	}
}
