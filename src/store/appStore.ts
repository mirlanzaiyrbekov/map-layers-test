import { createVedro } from "vedro"
import type { IAppState } from "./types"

const initialState: IAppState = {
	activeLayers: ["temperature"],
	selectedTimes: "10:00",
	isLoading: false,
	error: null,
	layerData: [],
}

export const {
	Context: AppStoreContext,
	Provider: AppStoreProvider,
	useStore: useAppStore,
	useSelector: useAppSelector,
	useDispatch: useAppDispatch,
} = createVedro(initialState)
