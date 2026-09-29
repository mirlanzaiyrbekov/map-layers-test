import type { ILayer, ILayerData, ITime } from "@/entities"

/**
 *
 * @param layer
 * @param time
 * @returns ILayerData
 */
export const fetchLayerData = (
	layer: ILayer,
	time: ITime,
): Promise<ILayerData> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				layerId: layer.id,
				time,
				data: [
					{
						point: { lat: 42.8746, lng: 74.5698 },
						value: Math.round(Math.random() * 30),
					},
					{
						point: { lat: 42.88, lng: 74.6 },
						value: Math.round(Math.random() * 30),
					},
					{
						point: { lat: 42.85, lng: 74.55 },
						value: Math.round(Math.random() * 30),
					},
				],
			})
		}, 700)
	})
}
