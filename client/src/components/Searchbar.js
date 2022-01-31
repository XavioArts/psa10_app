import React, { useEffect, useRef, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { FormControl, InputBase, Paper, Tooltip } from "@mui/material";

const Searchbar = () => {

  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);
  const [emptySearch, setEmptySearch] = useState(false);
  const navigate = useNavigate();
 

//   useEffect(()=>{
//       searchInput.current.focus();
//   }, [search])

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.white,
        '&:hover': {
          backgroundColor: theme.palette.white,
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            width: '20ch',
            // '&:focus': {
            //   width: '20ch',
            // },
          },
        },
      }));

      const handleSearch = (e) => {
        if (search === "") {
          e.preventDefault();
          setEmptySearch(true);
          return
        }
          navigate(`/search/${search}`)
      }

    return (
      <Tooltip open={emptySearch} onClose={()=>setEmptySearch(false)} title="Please enter a search term" >
        <Paper elevation={3} sx={{borderRadius: "10px", marginRight: "20px"}} >
            <form onSubmit={handleSearch} >
                <FormControl>
                    <Search>
                        <SearchIconWrapper>
                        <SearchIcon color="black" />
                        </SearchIconWrapper>
                        <StyledInputBase
                        autoFocus={clicked}
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        value={search}
                        onChange={(e)=> {
                            setSearch(e.target.value);
                            setClicked(true);
                        }}
                        />
                    </Search>
                </FormControl>
            </form>
        </Paper>
        </Tooltip>
    )
}

export default Searchbar;