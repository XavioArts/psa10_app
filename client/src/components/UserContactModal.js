import { Box, Icon, IconButton, Modal } from "@mui/material";
import ContactsIcon from "@mui/icons-material/Contacts";
import React, { useState } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { ModalBoxStyle } from "./Styles";
import DiscordIcon from "../Discord-Logo-Black.svg"
import DiscordIconColor from "../Discord-Logo-Color.svg"

const UserContactModal = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <IconButton onClick={handleOpen} >
                <ContactsIcon/>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={ModalBoxStyle}>
                <h1 style={{textAlign: "center"}} >Contact {props.nickname}</h1>
                {props.discord === "" && props.twitter === "" && props.facebook === "" && props.instagram === "" && <p style={{textAlign: "center", fontSize: "12px"}} >This user has no contact info!</p>}
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}} >
                    {props.discord !== "" && 
                        <IconButton component="a" href={props.discord} target="_blank" >
                            <img src={DiscordIconColor} alt="discord" width="40px" height="100%" />
                        </IconButton>
                    }
                    {props.discord === "" && 
                        <IconButton >
                            <img src={DiscordIcon} alt="discord" width="40px" height="100%" />
                        </IconButton>
                    }
                    {props.twitter !== "" && 
                        <IconButton component="a" href={props.twitter} target="_blank" >
                            <TwitterIcon color="primary" sx={{fontSize: "40px"}} />
                        </IconButton>
                    }
                    {props.twitter === "" && 
                        <IconButton >
                            <TwitterIcon sx={{ color: "black", fontSize: "40px"}} />
                        </IconButton>
                    }
                    {props.facebook !== "" && 
                        <IconButton component="a" href={props.facebook} target="_blank" >
                            <FacebookIcon color="primary" sx={{fontSize: "40px"}} />
                        </IconButton>
                    }
                    {props.facebook === "" && 
                        <IconButton >
                            <FacebookIcon sx={{ color: "black", fontSize: "40px"}} />
                        </IconButton>
                    }
                    {props.instagram !== "" && 
                        <IconButton component="a" href={props.instagram} target="_blank" >
                            <InstagramIcon color="primary" sx={{fontSize: "40px"}} />
                        </IconButton>
                    }
                    {props.instagram === "" && 
                        <IconButton >
                            <InstagramIcon sx={{ color: "black", fontSize: "40px"}} />
                        </IconButton>
                    }
                </Box>
                </Box>
            </Modal>
        </>
    )
};

export default UserContactModal;