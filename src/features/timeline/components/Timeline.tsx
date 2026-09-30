import { useAppDispatch, useAppSelector } from "../../../store/appStore"
import { timePoints } from "../timePoint"

export function Timeline() {
	const dispatch = useAppDispatch()

	const selectedTimeId = useAppSelector((state) => state.selectedTimes)

	const selectedIndex = timePoints.findIndex(
		(time) => time.id === selectedTimeId,
	)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const index = Number(event.target.value)

		dispatch("selectedTimes", timePoints[index].id)
	}

	return (
		<section className="rounded-xl bg-white p-4 shadow">
			<h2 className="mb-4 text-lg font-semibold">Временная шкала</h2>

			<div className="space-y-3">
				<input
					type="range"
					min={0}
					max={timePoints.length - 1}
					value={selectedIndex}
					onChange={handleChange}
					className="w-full"
				/>

				<div className="flex justify-between text-sm text-gray-500">
					{timePoints.map((time) => (
						<span key={time.id}>{time.description}</span>
					))}
				</div>
			</div>
		</section>
	)
}
