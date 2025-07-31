import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper } from "@mui/material";

export default function ContactDialog(props: Readonly<ContactDialogProps>) {
    return (
        <Dialog open={!!props.open} onClose={props.onClose} fullWidth>
            <DialogTitle className="d-flex align-items-center p-2 ps-3">
                <span className="w-100">Contact</span>
                <IconButton color="warning" onClick={props.onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className="p-0">
                <Paper square elevation={0} className="p-3" >
                    christopher.snay@gmail.com
                </Paper>
            </DialogContent>
            <DialogActions></DialogActions>
        </Dialog>
    )
}

interface ContactDialogProps {
    open?: boolean;
    onClose: () => void;
}