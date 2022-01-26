import { createTheme } from "@mui/material";
import styled from "styled-components";

export const ButtonDiv = styled.div`
margin: 10px;
`

export const PageDiv = styled.div`
    margin: 0;
    padding: 20px 30px;
`

export const FlexColumnDiv = styled.div`
    padding: 20px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const ModalBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const Cover = styled.div`
  background-image: url(${props => props.image}), linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3));
  overflow: hidden;
  `;

export const theme = createTheme({
    palette: {
        primary: {
            main: '#6569C8',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#90BDEE',
            contrastText: '#FFFFFF',
        },
        accent: {
            main: '#C4C4C4',
            contrastText: '#FFFFFF',
        },
        white: {
            main: '#FFFFFF',
            contrastText: '#272830',
        },
        black: {
            main: '#272830',
            contrastText: '#FFFFFF',
        },
    }
});