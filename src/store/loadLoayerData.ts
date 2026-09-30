import { layerConfig } from "@/features/layers/config"
import { timePoints } from "@/features/timeline/timePoint"
import { fetchLayerData } from "../services/data/mockApi"
import type { IAppState } from "./types"

let requestId = 0

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
				timePoints.map((time) => fetchLayerData(layer, time)),
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
