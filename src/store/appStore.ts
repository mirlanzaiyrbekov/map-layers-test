import { createVedro } from "vedro"
import type { IAppState } from "./types"

const initialState: IAppState = {
	activeLayers: [],
	error: null,
	isLoading: false,
	selectedTimes: "",
}

export const {
	Context: AppStoreContext,
	Provider: AppStoreProvider,
	useStore: useAppStore,
	useSelector: useAppSelector,
	useDispatch: useAppDispatch,
} = createVedro(initialState)
