import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts"

import { timePoints } from "@/features/timeline/timePoint"
import type { FC } from "react"
import type { JSX } from "react/jsx-dev-runtime"
import { useAppSelector } from "../../../store/appStore"

export const AnalyticsChart: FC = (): JSX.Element => {
	const { layerData } = useAppSelector((state) => ({
		layerData: state.layerData,
	}))

	const chartData = timePoints.map((time) => {
		const dataForTime = layerData.find((item) => item.time.id === time.id)

		const values = dataForTime?.data.map((item) => item.value) ?? []

		const average =
			values.length > 0
				? values.reduce((sum, value) => sum + value, 0) / values.length
				: 0

		return {
			time: time.description,
			value: Number(average.toFixed(1)),
		}
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

						<Line
							type="monotone"
							dataKey="value"
							stroke="currentColor"
							strokeWidth={2}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</section>
	)
}
