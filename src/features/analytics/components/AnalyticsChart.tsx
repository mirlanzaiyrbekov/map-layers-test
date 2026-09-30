import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts"

import { layerConfig } from "@/features/layers/config"
import { timePoints } from "@/features/timeline/timePoint"
import { useAppSelector } from "../../../store/appStore"

export function AnalyticsChart() {
	const { layerData, activeLayerIds } = useAppSelector((state) => ({
		layerData: state.layerData,
		activeLayerIds: state.activeLayers,
	}))

	const activeLayers = layerConfig.filter((layer) =>
		activeLayerIds.includes(layer.id),
	)

	const chartData = timePoints.map((time) => {
		const point: Record<string, string | number> = {
			time: time.description,
		}

		activeLayers.forEach((layer) => {
			const data = layerData.find(
				(item) => item.layerId === layer.id && item.time.id === time.id,
			)

			const values = data?.data.map((item) => item.value) ?? []

			const average =
				values.length > 0
					? values.reduce((sum, value) => sum + value, 0) / values.length
					: 0

			point[layer.id] = Number(average.toFixed(1))
		})

		return point
	})

	return (
		<section className="rounded-xl bg-white p-4 shadow">
			<h2 className="mb-4 text-lg font-semibold">Аналитика</h2>

			<div className="h-75">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={chartData}>
						<CartesianGrid strokeDasharray="3 3" />

						<XAxis dataKey="time" />

						<YAxis />

						<Tooltip />

						{activeLayers.map((layer) => (
							<Line
								key={layer.id}
								type="monotone"
								dataKey={layer.id}
								name={layer.name}
								stroke="currentColor"
								strokeWidth={2}
								dot={false}
							/>
						))}
					</LineChart>
				</ResponsiveContainer>
			</div>
		</section>
	)
}
