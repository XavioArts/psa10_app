import { Box, Icon, IconButton, Modal } from "@mui/material";
import React, { useState } from "react";
import TwitterIcon from "@mui/icons-material/Twitter"
import { ModalBoxStyle } from "./Styles";
import { useNavigate } from "react-router-dom";

const UserContactModal = (props) => {

    const [open, setOpen] = useState(false);
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();

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
                {props.discord === "" && props.twitter === "" && props.facebook === "" && props.instagram === "" && <p>This user has no contact info!</p>}
                {props.discord !== "" && <h4>Discord: {props.discord}</h4>}
                {props.twitter !== "" && 
                    <IconButton component="a" href={props.twitter} target="_blank" >
                        <TwitterIcon>
                            {/* <a href={props.twitter} /> */}
                        </TwitterIcon>
                    </IconButton>
                }
                {props.facebook !== "" && <h4>Facebook: {props.facebook}</h4>}
                {props.instagram !== "" && <h4>Instagram: {props.instagram}</h4>}
                </Box>
            </Modal>
        </>
    )
};

export default UserContactModal;