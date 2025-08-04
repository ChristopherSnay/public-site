import { useCallback, useEffect, useState } from "react";
import type { Education } from "../models/Education";
import { fetchEducation } from "../services/educationService";

export default function useEducation() {
    const [education, setEducation] = useState<Education[]>([]);

    const refreshEducation = useCallback(() => {
        fetchEducation().then(response => {
            setEducation(response
                .sort((a: Education, b: Education) => a.graduationYear < b.graduationYear
                    ? 1
                    : -1));
        });
    }, []);

    useEffect(() => {
        refreshEducation();
    }, []);

    return {
        education,
        refreshEducation
    }
}