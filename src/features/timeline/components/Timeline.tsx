import { useAppDispatch, useAppSelector } from "../../../store/appStore"
import { timePoints } from "../timePoint"

export function Timeline() {
	const dispatch = useAppDispatch()

	const { selectedTimeId } = useAppSelector((state) => ({
		selectedTimeId: state.selectedTimes,
	}))

	const selectTime = (timeId: string) => {
		dispatch("selectedTimes", timeId)
	}

	return (
		<section className="rounded-xl bg-white p-4 shadow">
			<h2 className="mb-4 text-lg font-semibold">Временная шкала</h2>

			<div className="flex items-center justify-between gap-2">
				{timePoints.map((time) => {
					const isSelected = selectedTimeId === time.id

					return (
						<button
							key={time.id}
							type="button"
							onClick={() => selectTime(time.id)}
							className={`rounded-lg px-3 py-2 text-sm transition ${
								isSelected
									? "bg-blue-600 text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							{time.description}
						</button>
					)
				})}
			</div>
		</section>
	)
}
