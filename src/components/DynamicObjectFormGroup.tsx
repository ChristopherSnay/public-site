import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, FormLabel, IconButton, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { BLOCK_TYPES } from "../constants/blockTypes";

export default function DynamicObjectFieldGroup(props: Readonly<DynamicObjectFieldGroupProps>) {
    const [showBlockTypeDialog, setShowBlockTypeDialog] = useState<boolean>(false);
    const [selectedBlockType, setSelectedBlockType] = useState<number>(1);

    const handleRemoveField = (index: number) => {
        const updated = props.values.filter((_, i) => i !== index);
        props.onChange(updated.length ? updated : [""]);
    };

    const handleFieldChange = (value: string, index: number) => {
        const updated = [...props.values];
        updated[index] = ({ ...updated[index], content: value });
        props.onChange(updated);
    }

    const handleDialogClose = () => {
        setShowBlockTypeDialog(false);
        props.onChange([...props.values, { content: '', blockType: selectedBlockType }]);
    }

    /** Allow tabs in the textarea */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, index: number) => {
        if (!e.shiftKey && e.key === 'Tab') {
            e.preventDefault();
            const target = e.target as HTMLInputElement;
            const { selectionStart, selectionEnd } = target;
            const tab = '\t';
            const newText =
                target.value.substring(0, selectionStart ?? 0) +
                tab +
                target.value.substring(selectionEnd ?? 0);
            handleFieldChange(newText, index);
        }
    }

    return (
        <FormGroup>
            <FormLabel
                component="legend"
                className="mb-3">
                {props.label}
            </FormLabel>
            <Stack spacing={2}>
                {props.values.map((value, index) => (
                    <Box key={index}
                        display="flex"
                        alignItems="center"
                        gap={1}>
                        <TextField
                            fullWidth
                            multiline
                            label={`${props.label.slice(0, -1)} ${index + 1}`}
                            minRows={3}
                            value={value.content}
                            onChange={e => handleFieldChange(e.target.value, index)}
                            onKeyDown={(e: any) => handleKeyDown(e, index)}

                        />
                        <IconButton
                            color="error"
                            disabled={props.values.length === 1}
                            onClick={() => handleRemoveField(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
                <IconButton
                    color="primary"
                    className="mx-auto my-2"
                    onClick={_ => setShowBlockTypeDialog(true)}>
                    <AddIcon />
                </IconButton>
            </Stack>

            <Dialog
                maxWidth="md"
                open={showBlockTypeDialog}
                onClose={_ => setShowBlockTypeDialog(false)}>
                <DialogTitle>
                    Block Type
                </DialogTitle>
                <DialogContent>
                    <Select
                        value={selectedBlockType}
                        onChange={e => setSelectedBlockType(Number(e.target.value))}>
                        {Object.entries(BLOCK_TYPES).map(([key]) => (
                            <MenuItem value={key}>{BLOCK_TYPES[parseInt(key)]}</MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={_ => setShowBlockTypeDialog(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleDialogClose}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </FormGroup>
    );
};

interface DynamicObjectFieldGroupProps {
    label: string;
    values: any[];
    onChange: (values: any[]) => void;
}