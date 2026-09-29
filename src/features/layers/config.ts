import type { ILayer } from "@/entities"

export const layerConfig: ILayer[] = [
	{
		id: "temperature",
		name: "Температура",
		type: "temperature",
		unit: "°C",
	},
	{
		id: "wind",
		name: "Ветер",
		type: "wind",
		unit: "м/с",
	},
	{
		id: "solar",
		name: "Солнечная радиация",
		type: "solar",
		unit: "Вт/м²",
	},
	{
		id: "humidity",
		name: "Влажность",
		type: "humidity",
		unit: "%",
	},
]
