import type { ITime } from "../time/types"
import type { IPoint } from "./pointData"

export interface ILayerData {
	layerId: string
	time: ITime
	data: IPoint[]
}
