import { toast } from "react-toastify"

export const toastCall = (msg, type) => {
	switch (type) {
		case "success":
			return toast.success(msg)
		case "error":
			return toast.error(msg)
		case "warning":
			return toast.warning(msg)
	}
}
