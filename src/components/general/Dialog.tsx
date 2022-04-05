import React, { useCallback } from "react";
//ui
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
export interface DialogProps {
    open: boolean;
    title?: string;
    onSubmit: (...props: any) => void;
    onClose: () => void;
    children: React.ReactNode;
    closeButton?: boolean;
}

const GeneralDialog: React.FunctionComponent<DialogProps> = (props: DialogProps) => {
    const { title, onSubmit, onClose, closeButton, ...other } = props;

    const handleOnSubmit = () => {
        onSubmit();
    }

    const handleClose = useCallback((event: object, reason: string) => {
        if(reason !== "backdropClick") onClose();
    }, [onClose]);

    const handleCloseButtonOnClick = useCallback(() => {
        onClose();
    }, [onClose]);

    return (
        <Dialog {...other} onClose={handleClose} disableEscapeKeyDown>
            {title &&
                <DialogTitle>
                    {title}
                </DialogTitle>
            }
            <DialogContent dividers>
                {props.children}
            </DialogContent>
            <DialogActions>
                {closeButton &&
                    <Button autoFocus onClick={handleCloseButtonOnClick}>取消</Button>
                }
                <Button onClick={handleOnSubmit}>確定</Button>
            </DialogActions>
        </Dialog >
    )
}

export default React.memo(GeneralDialog);