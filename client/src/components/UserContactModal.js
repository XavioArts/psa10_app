import { Box, Icon, IconButton, Modal } from "@mui/material";
import React, { useState } from "react";
import { ModalBoxStyle } from "./Styles";

const UserContactModal = (props) => {

    const [open, setOpen] = useState(false);
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <IconButton onClick={handleOpen} >
                <Icon>message</Icon>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={ModalBoxStyle}>
                <h1>Contact {props.nickname}</h1>
                <h4>Discord: {props.discord}</h4>
                <h4>Twitter: {props.twitter}</h4>
                <h4>Facebook: {props.facebook}</h4>
                <h4>Instagram: {props.instagram}</h4>
                </Box>
            </Modal>
        </>
    )
};

export default UserContactModal;