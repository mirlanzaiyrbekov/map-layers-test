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

		const time = timePoints[index]

		if (!time) return

		dispatch("selectedTimes", time.id)
	}

	return (
		<section className="rounded-xl bg-white p-4 shadow">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-lg font-semibold">Временная шкала</h2>

				<span className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium">
					{timePoints[selectedIndex]?.description}
				</span>
			</div>

			<div className="space-y-3">
				<input
					type="range"
					min={0}
					max={timePoints.length - 1}
					value={selectedIndex}
					onChange={handleChange}
					className="w-full cursor-pointer"
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
