import { Card, CardContent, Typography } from "@mui/material";
import { useDates } from "../hooks/useDates";
import useExperience from "../hooks/useExperience";

export default function ExperiencePage() {
    const { experience } = useExperience();
    const { localDate } = useDates();

    return (
        <section className="container my-5">
            <div className="row g-3">
                {experience.map((exp, index) => (
                    <div key={index} className="col-12">
                        <Card className="border border-1 border-dark">
                            <CardContent className="d-flex">
                                <div className="d-flex flex-column">
                                    <Typography variant="h6" className="lh-1">{exp.company}</Typography>
                                    <Typography variant="subtitle1" >{exp.positionTitle}</Typography>
                                    <Typography variant="subtitle2" className="lh-1" color="textSecondary">
                                        {localDate(exp.startDate)} - {exp.endDate ? localDate(exp.endDate) : 'Present'}
                                    </Typography>
                                    <Typography variant="body1" className="mt-2">{exp.description}</Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </section>
    );
}