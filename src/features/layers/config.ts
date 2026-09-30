import type { ILayer } from "@/entities"

export const layerConfig: ILayer[] = [
	{
		id: "temperature",
		name: "Температура",
		type: "temperature",
		unit: "°C",
		color: "rgba(239, 68, 68, 0.7)",
	},
	{
		id: "wind",
		name: "Ветер",
		type: "wind",
		unit: "м/с",
		color: "rgba(59, 130, 246, 0.7)",
	},
	{
		id: "solar",
		name: "Солнечная радиация",
		type: "solar",
		unit: "Вт/м²",
		color: "rgba(234, 179, 8, 0.7)",
	},
]
