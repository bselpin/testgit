import { createStore, compose, applyMiddleware } from "redux"
import { createWrapper } from "next-redux-wrapper"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import rootReducer from "reducers/rootReducer"

const store = () => {
	const enhancer =
		process.env.NODE_ENV === "development"
			? composeWithDevTools(applyMiddleware(thunk))
			: compose(applyMiddleware(thunk))

	const store = createStore(rootReducer, enhancer)
	return store
}

const wrapper = createWrapper(store)

export default wrapper
