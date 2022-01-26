import { Box, Icon, IconButton, Modal, SvgIcon } from "@mui/material";
import React, { useState } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { ModalBoxStyle } from "./Styles";
import { useNavigate } from "react-router-dom";
import DiscordIcon from "../Discord-Logo-Black.svg"
import DiscordIconColor from "../Discord-Logo-Color.svg"

const UserContactIcons = (props) => {

    return (
<>
              {props.discord === "" && props.twitter === "" && props.facebook === "" && props.instagram === "" && <p style={{textAlign: "center", fontSize: "12px"}} >This user has no contact info!</p>}
              <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}} >
                  {props.discord !== "" && 
                      <IconButton component="a" href={props.discord} target="_blank" >
                          {/* <SvgIcon component={DiscordIcon} fontSize="5px" /> */}
                          <img src={DiscordIconColor} alt="discord" width="20px" height="100%" />
                      </IconButton>
                  }
                  {props.twitter !== "" && 
                      <IconButton component="a" href={props.twitter} target="_blank" >
                          <TwitterIcon color="rgb(112, 112, 112)" sx={{fontSize: "20px"}} />
                      </IconButton>
                  }
                  {props.facebook !== "" && 
                      <IconButton component="a" href={props.facebook} target="_blank" >
                          <FacebookIcon color="rgb(112, 112, 112)" sx={{fontSize: "20px"}} />
                      </IconButton>
                  }
                  {props.instagram !== "" && 
                      <IconButton component="a" href={props.instagram} target="_blank" >
                          <InstagramIcon color="rgb(112, 112, 112)" sx={{fontSize: "20px"}} />
                      </IconButton>
                  }
              </Box>
              </>
  )
};

export default UserContactIcons;