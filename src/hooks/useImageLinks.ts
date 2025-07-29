export default function useImageLinks() {
    const localImage = (src: string): string => {
        return `${import.meta.env.BASE_URL}${src}`
    }

    return {
        localImage
    }
}