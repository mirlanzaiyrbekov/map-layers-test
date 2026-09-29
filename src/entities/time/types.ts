import type { TypeBase } from "@/shared"

export interface ITime extends TypeBase {
	timestamp: string
	description: string // or Label
}
