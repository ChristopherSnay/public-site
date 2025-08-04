import { useCallback, useEffect, useState } from "react";
import type { Experience } from "../models/Experience";
import { fetchExperience } from "../services/experienceService";

export default function useExperience() {
    const [experience, setExperience] = useState<Experience[]>([]);

    const refreshExperience = useCallback(() => {
        fetchExperience().then(response => {
            setExperience(response.sort((a, b) => a.startDate < b.startDate ? 1 : -1));
        });
    }, []);

    useEffect(() => {
        refreshExperience();
    }, []);

    return {
        experience,
        refreshExperience
    };
}