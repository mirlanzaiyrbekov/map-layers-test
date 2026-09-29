import { useEffect, type FC } from "react"

import { loadLayerData } from "@/store/loadLoayerData"
import { useAppSelector } from "../../../store/appStore"

export const LayerDataLoader: FC = () => {
	const { activeLayerIds, selectedTimeId } = useAppSelector((state) => ({
		activeLayerIds: state.activeLayers,
		selectedTimeId: state.selectedTimes,
	}))

	useEffect(() => {
		void loadLayerData()
	}, [activeLayerIds, selectedTimeId])

	return null
}
