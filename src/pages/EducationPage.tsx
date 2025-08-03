import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import useEducation from "../hooks/useEducation";
import useImages from "../hooks/useImages";

export default function EducationPage() {
    const { education } = useEducation();
    const { localImage } = useImages();

    return (
        <section className="container my-5">
            <div className="row g-3" >
                {education.map((edu, index) => (
                    <div key={index} className="col-12 col-md-6">
                        <Card className="border border-1 border-dark">
                            <CardContent className="d-flex">
                                <CardMedia
                                    component="img"
                                    sx={{ width: 100, height: 100 }}
                                    image={localImage(edu.image ?? '')}
                                    alt={`${edu.institution} logo`}
                                    className="object-fit-contain" />
                                <Box className="d-flex flex-column ms-3">
                                    <Typography variant="h6">
                                        {edu.institution}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {edu.degree}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {edu.fieldOfStudy}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Graduated: {edu.graduationYear}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </section>
    )
}