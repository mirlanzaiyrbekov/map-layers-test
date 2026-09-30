import { layerConfig } from "@/features/layers/config"
import { timePoints } from "@/features/timeline/timePoint"
import { fetchLayerData } from "../services/data/mockApi"
import type { IAppState } from "./types"
let requestId = 0

const dataCache = new Map<string, Awaited<ReturnType<typeof fetchLayerData>>>()
interface LoadLayerDataParams {
	activeLayerIds: IAppState["activeLayers"]
	selectedTimeId: IAppState["selectedTimes"]
	dispatch: (state: Partial<IAppState>) => void
}

export async function loadLayerData({
	activeLayerIds,
	selectedTimeId,
	dispatch,
}: LoadLayerDataParams) {
	const currentRequestId = ++requestId

	const activeLayers = layerConfig.filter((layer) =>
		activeLayerIds.includes(layer.id),
	)

	const selectedTime = timePoints.find((time) => time.id === selectedTimeId)

	if (!selectedTime || activeLayers.length === 0) {
		dispatch({
			isLoading: false,
			layerData: [],
			error: null,
		})

		return
	}

	dispatch({
		isLoading: true,
		error: null,
	})

	try {
		const results = await Promise.all(
			activeLayers.flatMap((layer) =>
				timePoints.map(async (time) => {
					const cacheKey = `${layer.id}:${time.id}`

					const cached = dataCache.get(cacheKey)

					if (cached) {
						return cached
					}

					const result = await fetchLayerData(layer, time)

					dataCache.set(cacheKey, result)

					return result
				}),
			),
		)

		if (currentRequestId !== requestId) {
			return
		}

		dispatch({
			layerData: results,
			isLoading: false,
		})
	} catch {
		if (currentRequestId !== requestId) {
			return
		}

		dispatch({
			isLoading: false,
			error: "Не удалось загрузить данные",
		})
	}
}
