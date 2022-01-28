import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import ProfileImageUpload from "../components/ProfileImageUpload";
import { Button, Divider, TextField } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


const EditUser = (props) => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState(auth.email)
  const [first_name, setFirst_name] = useState(auth.first_name)
  const [last_name, setLast_name] = useState(auth.last_name)
  const [nickname, setNickname] = useState(auth.nickname)
  const [about, setAbout] = useState(auth.about)
  const [twitter, setTwitter] = useState(auth.twitter)
  const [discord, setDiscord] = useState(auth.discord)
  const [facebook, setFacebook] = useState(auth.facebook)
  const [instagram, setInstagram] = useState(auth.instagram)
  const [emailVerify, setEmailVerify] = useState(true);
  const [firstNameVerify, setFirstNameVerify] = useState(true);
  const [lastNameVerify, setLastNameVerify] = useState(true);
  const [nicknameVerify, setNicknameVerify] = useState(true);
  const [twitterVerify, setTwitterVerify] = useState(true);
  const [discordVerify, setDiscordVerify] = useState(true);
  const [facebookVerify, setFacebookVerify] = useState(true);
  const [instagramVerify, setInstagramVerify] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!first_name) {
        setFirstNameVerify(false)
    } if (!last_name) {
        setLastNameVerify(false)
    } if (!nickname) {
        setNicknameVerify(false)
    } if (!checkEmail()) {
        setEmailVerify(false)
    } if (twitter || discord || facebook || instagram) {
        if (!checkSocials(twitter)) {
          setTwitterVerify(false)
        } if (!checkSocials(discord)) {
          setDiscordVerify(false)
        } if (!checkSocials(facebook)) {
          setFacebookVerify(false)
        } if (!checkSocials(instagram)) {
          setInstagramVerify(false)
        } if (!checkSocials(twitter) || !checkSocials(discord) || !checkSocials(facebook) || !checkSocials(instagram)){
          return;
        }
    }if (first_name && last_name && nickname && checkEmail()) {
    return auth.handleUpdate({ email, first_name, last_name, nickname, about, discord, facebook, twitter, instagram }, navigate);
    };
  }

  const checkEmail = () => {
    let verifyEmail = email
    let filter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!filter.test(verifyEmail)){
        return false
    } else {
        return true
    }
  }

  const checkSocials = (input) => {
    if ((/[0-9a-zA-Z^<>()[\]\\.,;:\s@"]{1,}/).test(input)) {
      return (input.startsWith("https://"))
    }
    return true
  }

  const handleClearClick = () => {
    setFirst_name("")
    setLast_name("")
    setNickname("")
    setEmail("")
    setAbout("")
    setTwitter("")
    setDiscord("")
    setFacebook("")
    setInstagram("")
  }

  const handleEmailerror = () => {
    if (!emailVerify){
        return(
            <TextField style={{margin: '10px'}}
                error
                label="Email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailVerify(true)
                }}
                helperText="Valid email required"
            /> 
          )
    } else {
        return(
            <TextField style={{margin: '10px'}}
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        )
      }
  }

  const handleFirstNameError = () => {
    if (!firstNameVerify){
        return(
            <TextField style={{margin: '10px'}}
                error
                label="First Name"
                value={first_name}
                onChange={(e) => {
                    setFirst_name(e.target.value)
                    setFirstNameVerify(true)
                }}
                helperText="First name required"
            /> 
        )
    } else {
        return(
            <TextField style={{margin: '10px'}}
            label="First Name"
            value={first_name} 
            onChange={(e) => setFirst_name(e.target.value)}
        />
        )
    }
  }

  const handleLastNameError = () => {
    if (!lastNameVerify){
        return(
            <TextField style={{margin: '10px'}}
                error
                label="Last Name"
                value={last_name}
                onChange={(e) => {
                    setLast_name(e.target.value)
                    setLastNameVerify(true)
                }}
                helperText="Last name required"
            /> 
          )
      } else {
        return(
            <TextField style={{margin: '10px'}}
            label="Last Name"
            value={last_name} 
            onChange={(e) => setLast_name(e.target.value)}
        />
        )
     }
  }

  const handleNicknameError = () => {
      if (!nicknameVerify){
          return(
              <TextField style={{margin: '10px'}}
                  error
                  label="Nickname"
                  value={nickname}
                  onChange={(e) => {
                      setNickname(e.target.value)
                      setNicknameVerify(true)
                  }}
                  helperText="Nickname required"
              /> 
          )
      } else {
          return(
              <TextField style={{margin: '10px'}}
              label="Display Name"
              value={nickname} 
              onChange={(e) => setNickname(e.target.value)}
          />
          )
      }
  }

  const handleDiscordError = () => {
    if (!discordVerify){
        return(
            <TextField style={{margin: '10px'}}
                error
                label="Discord"
                value={discord}
                onChange={(e) => {
                    setDiscord(e.target.value)
                    setDiscordVerify(true)
                }}
                helperText="Social media links need to begin with https://"
            /> 
        )
    } else {
        return(
          <TextField style={{margin: '10px'}}
          label="Discord"
          value={discord}
          onChange={(e) => { setDiscord(e.target.value); }}
          />
        )
    }
  }

  const handleTwitterError = () => {
    if (!twitterVerify){
        return(
            <TextField style={{margin: '10px'}}
                error
                label="Twitter"
                value={twitter}
                onChange={(e) => {
                    setTwitter(e.target.value)
                    setTwitterVerify(true)
                }}
                helperText="Social media links need to begin with https://"
            /> 
        )
    } else {
        return(
          <TextField style={{margin: '10px'}}
          label="Twitter"
          value={twitter}
          onChange={(e)=> setTwitter(e.target.value) }
          />
        )
    }
  }

  const handleFacebookError = () => {
    if (!facebookVerify){
        return(
            <TextField style={{margin: '10px'}}
                error
                label="Facebook"
                value={facebook}
                onChange={(e) => {
                    setFacebook(e.target.value)
                    setFacebookVerify(true)
                }}
                helperText="Social media links need to begin with https://"
            /> 
        )
    } else {
        return(
          <TextField style={{margin: '10px'}}
          label="Facebook"
          value={facebook}
          onChange={(e) => { setFacebook(e.target.value); }}
          />
        )
    }
  }

  const handleInstagramError = () => {
    if (!instagramVerify){
        return(
            <TextField style={{margin: '10px'}}
                error
                label="Instagram"
                value={instagram}
                onChange={(e) => {
                    setInstagram(e.target.value)
                    setInstagramVerify(true)
                }}
                helperText="Social media links need to begin with https://"
            /> 
        )
    } else {
        return(
          <TextField style={{margin: '10px'}}
          label="Instagram"
          value={instagram}
          onChange={(e) => { setInstagram(e.target.value); }}
          />
        )
    }
  }

  return (
    <div style={{position: 'absolute', left: '15%', marginTop: '40px'}}>
      <div>
        <h1>Edit My Profile</h1>
        <p>You can set preferred display name and manage other personal settings.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 20, marginTop: '40px'}}>
        <div>
          <ProfileImageUpload />
        </div>
        <div>
          <h3 style={{margin: '10px', marginBottom: '20px'}}>Account Info</h3>
          <form onSubmit={handleSubmit}>
            {handleFirstNameError()}
            {handleLastNameError()}
            <br />
            {handleNicknameError()}
            <br />
            {handleEmailerror()}
            <br />
            <TextField
              style={{ margin: '10px', width: 400}}
              id="filled-multiline-flexible"
              label="Tell Us About Yourself"
              multiline
              rows={5}
              value={about}
              onChange={(e) => { setAbout(e.target.value); }}
              />
            <h3 style={{margin: '10px', marginBottom: '20px'}}>Social Media Links</h3>
              <p style={{margin: '10px', lineHeight: '25px'}}>{'To add social media links, copy your profile url from the address bar.'}<br style={{margin: '5px'}}/>{'It must contain the "https://" at the beginning'}</p>
            <br/>
            {handleDiscordError()}
            <br />
            {handleTwitterError()}
            <br />
            {handleFacebookError()}
            <br />
            {handleInstagramError()}
            <br />
            <Button style={{margin: '10px'}} variant="contained" type="submit" >Submit</Button>
            <Button style={{margin: '10px', color: 'grey'}} variant="text" onClick={()=>{handleClearClick()}}>{<HighlightOffIcon style={{marginRight: '5px'}}/>}Clear all</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
