import { CONFIG } from "../constants/config"

export default function useImages() {
    const localImage = (src?: string): string => {
        if (src) {
            return `${import.meta.env.BASE_URL}static/images/${src}`
        } else {
            return `${import.meta.env.BASE_URL}static/images/${CONFIG.DEFAULT_IMAGE}`
        }
    }

    return {
        localImage
    }
}