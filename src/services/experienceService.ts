import type { Experience } from "../models/Experience";

export async function fetchExperience(): Promise<Experience[]> {
    try {
        const response = await fetch(`${import.meta.env.BASE_URL}static/data/experience/manifest.json`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const files: string[] = await response.json();
        const allData = await Promise.all(
            files.map((path: string) =>
                fetch(`${import.meta.env.BASE_URL}static/data/experience/${path}`)
                    .then(res => res.json().then(json => ({ ...json, id: path.replace('.json', '') })))
                    .catch(err => {
                        console.log(`Failed to fetch ${path}`, err);
                        return null;
                    })
            )
        );

        return allData.filter(Boolean) as Experience[];
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return [];
    }
}