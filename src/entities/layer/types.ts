import type { TypeBase } from "@/shared"

export interface ILayer extends TypeBase {
	name: string
	type: TypeLayer
	unit: string
	color: string
}
export type TypeLayer = "temperature" | "wind" | "solar" | "humidity"
