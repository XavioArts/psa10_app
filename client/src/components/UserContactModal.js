import { Box, Icon, IconButton, Modal, SvgIcon } from "@mui/material";
import React, { useState } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { ModalBoxStyle } from "./Styles";
import { useNavigate } from "react-router-dom";
import DiscordIcon from "../Discord-Logo-Black.svg"
import DiscordIconColor from "../Discord-Logo-Color.svg"

const UserContactModal = (props) => {

    const [open, setOpen] = useState(false);
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();

    // const DiscordIcon = (props) => (
    //     <svg
    //       width={71}
    //       height={55}
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //       {...props}
    //     >
    //       <g clipPath="url(#a)">
    //         <path
    //           d="M60.105 4.898A58.55 58.55 0 0 0 45.653.415a.22.22 0 0 0-.233.11 40.784 40.784 0 0 0-1.8 3.697c-5.456-.817-10.886-.817-16.23 0-.485-1.164-1.201-2.587-1.828-3.697a.228.228 0 0 0-.233-.11 58.386 58.386 0 0 0-14.451 4.483.207.207 0 0 0-.095.082C1.578 18.73-.944 32.144.293 45.39a.244.244 0 0 0 .093.167c6.073 4.46 11.955 7.167 17.729 8.962a.23.23 0 0 0 .249-.082 42.08 42.08 0 0 0 3.627-5.9.225.225 0 0 0-.123-.312 38.772 38.772 0 0 1-5.539-2.64.228.228 0 0 1-.022-.378c.372-.279.744-.569 1.1-.862a.22.22 0 0 1 .23-.03c11.619 5.304 24.198 5.304 35.68 0a.219.219 0 0 1 .233.027c.356.293.728.586 1.103.865a.228.228 0 0 1-.02.378 36.384 36.384 0 0 1-5.54 2.637.227.227 0 0 0-.121.315 47.249 47.249 0 0 0 3.624 5.897.225.225 0 0 0 .249.084c5.801-1.794 11.684-4.502 17.757-8.961a.228.228 0 0 0 .092-.164c1.48-15.315-2.48-28.618-10.497-40.412a.18.18 0 0 0-.093-.084Zm-36.38 32.427c-3.497 0-6.38-3.211-6.38-7.156 0-3.944 2.827-7.156 6.38-7.156 3.583 0 6.438 3.24 6.382 7.156 0 3.945-2.827 7.156-6.381 7.156Zm23.593 0c-3.498 0-6.38-3.211-6.38-7.156 0-3.944 2.826-7.156 6.38-7.156 3.582 0 6.437 3.24 6.38 7.156 0 3.945-2.798 7.156-6.38 7.156Z"
    //           fill="#23272A"
    //         />
    //       </g>
    //       <defs>
    //         <clipPath id="a">
    //           <path fill="#fff" d="M0 0h71v55H0z" />
    //         </clipPath>
    //       </defs>
    //     </svg>
    //   )

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
                <h1 style={{textAlign: "center"}} >Contact {props.nickname}</h1>
                {props.discord === "" && props.twitter === "" && props.facebook === "" && props.instagram === "" && <p style={{textAlign: "center", fontSize: "12px"}} >This user has no contact info!</p>}
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}} >
                    {props.discord !== "" && 
                        <IconButton component="a" href={props.discord} target="_blank" >
                            {/* <SvgIcon component={DiscordIcon} fontSize="5px" /> */}
                            <img src={DiscordIconColor} alt="discord" width="40px" height="100%" />
                        </IconButton>
                    }
                    {props.discord === "" && 
                        <IconButton >
                            {/* <SvgIcon component={DiscordIcon} fontSize="5px" /> */}
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