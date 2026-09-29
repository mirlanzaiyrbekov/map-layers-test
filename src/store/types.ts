import type { ILayerData } from "@/entities"

export type IAppState = {
	activeLayers: string[]
	selectedTimes: string
	isLoading: boolean
	error: string | null
	layerData: ILayerData[]
}
