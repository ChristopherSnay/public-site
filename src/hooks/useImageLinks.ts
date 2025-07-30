export default function useImageLinks() {
    const localImage = (src: string): string => {
        return `${import.meta.env.BASE_URL}static/images/${src}`
    }

    return {
        localImage
    }
}