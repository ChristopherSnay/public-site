import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, FormGroup, FormLabel, IconButton, Stack, TextField } from "@mui/material";

export default function DynamicFieldGroup(props: Readonly<DynamicFieldGroupProps>) {
    const handleAddField = () => {
        props.onChange([...props.values, ""], props.values.length + 1);
    };

    const handleRemoveField = (index: number) => {
        const updated = props.values.filter((_, i) => i !== index);
        props.onChange(updated.length ? updated : [""], index);
    };

    const handleFieldChange = (index: number, value: string) => {
        const updated = [...props.values];
        updated[index] = value;
        props.onChange(updated, index);
    };

    return (
        <FormGroup>
            <FormLabel component="legend" className="mb-3">{props.label}</FormLabel>
            <Stack spacing={2}>
                {props.values.map((value, index) => (
                    <Box key={index} display="flex" alignItems="center" gap={1}>
                        <TextField
                            label={`${props.label.slice(0, -1)} ${index + 1}`}
                            value={value}
                            onChange={e => handleFieldChange(index, e.target.value)}
                            fullWidth
                        />
                        <IconButton
                            onClick={() => handleRemoveField(index)}
                            color="error"
                            disabled={props.values.length === 1}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
                <IconButton onClick={handleAddField} color="primary" className="mx-auto my-2">
                    <AddIcon />
                </IconButton>
            </Stack>
        </FormGroup>
    );
};

interface DynamicFieldGroupProps {
    label: string;
    values: any[];
    onChange: (value: any, index: number) => void;
}