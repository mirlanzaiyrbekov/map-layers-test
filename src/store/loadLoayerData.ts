import { layerConfig } from "@/features/layers/config"
import { timePoints } from "@/features/timeline/timePoint"
import { fetchLayerData } from "../services/data/mockApi"
import { useAppStore } from "./appStore"

let requestId = 0

export async function loadLayerData() {
	const currentRequestId = ++requestId
	const store = useAppStore()

	const state = store.get()

	const activeLayers = layerConfig.filter((layer) =>
		state.activeLayers.includes(layer.id),
	)

	const selectedTime = timePoints.find(
		(time) => time.id === state.selectedTimes,
	)

	if (!selectedTime || activeLayers.length === 0) {
		store.dispatch({
			isLoading: false,
			layerData: [],
			error: null,
		})

		return
	}

	store.dispatch({
		isLoading: true,
		error: null,
	})

	try {
		const results = await Promise.all(
			activeLayers.map((layer) => fetchLayerData(layer, selectedTime)),
		)

		if (currentRequestId !== requestId) {
			return
		}

		store.dispatch({
			layerData: results,
			isLoading: false,
		})
	} catch {
		if (currentRequestId !== requestId) {
			return
		}

		store.dispatch({
			isLoading: false,
			error: "Не удалось загрузить данные",
		})
	}
}
