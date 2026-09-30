import { useEffect } from "react"

import { loadLayerData } from "@/store/loadLoayerData"
import { useAppDispatch, useAppSelector } from "../../../store/appStore"

export function LayerDataLoader() {
	const dispatch = useAppDispatch()

	const { activeLayerIds, selectedTimeId } = useAppSelector((state) => ({
		activeLayerIds: state.activeLayers,
		selectedTimeId: state.selectedTimes,
	}))

	useEffect(() => {
		void loadLayerData({
			activeLayerIds,
			selectedTimeId,
			dispatch,
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeLayerIds, selectedTimeId])

	return null
}
