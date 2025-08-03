import { useCallback, useEffect, useState } from "react";
import type { Education } from "../models/Education";
import { fetchEducation } from "../services/educationService";

export default function useEducation() {
    const [education, setEducation] = useState<Education[]>([]);

    const getById = useCallback((id: number): Promise<Education | undefined> => {
        if (education?.length > 0) {
            const match = education.find(x => x.id == id);
            return Promise.resolve(match);
        } else {
            return fetchEducation().then(results => results.find(x => x.id == id));
        }
    }, [education]);

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
        getById,
        refreshEducation
    }
}