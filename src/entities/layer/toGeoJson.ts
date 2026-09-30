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
			},
		})),
	}
}
