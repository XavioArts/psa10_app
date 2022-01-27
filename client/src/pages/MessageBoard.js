import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Icon, Input, Paper, Stack, createTheme, ThemeProvider } from "@mui/material";
import Modal from '@mui/material/Modal';
import AddTopic from '../components/AddTopic';
import { AuthContext } from '../providers/AuthProvider';
import ReactPaginate from 'react-paginate';

const MessageBoard = (props) => {
  const auth = useContext(AuthContext);
  const [topics, setTopics] = useState([])
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [currentTopics, setCurrentTopics] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [topicOffset, setTopicOffset] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const topicsPerPage = 4

  const navigate = useNavigate()

  const theme = createTheme({
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

  useEffect(()=>{
    getTopics()
  },[open])


  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = topicOffset + topicsPerPage;
    setCurrentTopics(filteredTopics.slice(topicOffset, endOffset));
    setPageCount(Math.ceil(filteredTopics.length / topicsPerPage));
  }, [topicOffset, topicsPerPage, filteredTopics]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * topicsPerPage) % topics.length;
    setTopicOffset(newOffset);
  };

  const getTopics = async () => {
    try {
      let res = await axios.get(`/api/topics`);
      setTopics(res.data);
      setFilteredTopics(res.data)
      setCurrentTopics(res.data.slice(0, 4))
      setPageCount(Math.ceil(res.data.length / topicsPerPage));
    } catch (err) {
      console.log(err.response);
      alert("Error getting topics")
    }
  }

 

  const addTopic = (topic) =>{
    setTopics([topic, ...topics])
    handleClose()
  }
  const renderLoginBox = () => {
    return(
      <div style={{width: "93%", margin: "auto", padding: "10px", background: "#DCDCDC"}} >
        <h3>Want to join the conversation?</h3>
        <h3>{<Link to="/login">Login</Link>} or {<Link to="/login">Register</Link>}</h3>
      </div>
    )
  }

    const renderTopics = () => {
    let topicBox = currentTopics.map(t=>{
      const handleOnClick = () =>{
        navigate(`/messageboard/${t.id}`)
      }
      return(
        <Paper key={t.id} elevation={0} onClick={()=>handleOnClick()} style={{ padding: '5px', border: '1px solid #C4C4C4', borderRadius: '10px', margin: '20px 0px', cursor: 'pointer' }}>
          <h6 style={{margin: '5px'}}>Posted by {t.user_nickname}</h6>
          <h3>{t.title}</h3>
          <p>{t.body}</p>
        </Paper>
      )
    })
    return topicBox
  }

  const searchTopics = async (e) => {
    e.preventDefault();
    try {
        let res = await axios.get(`/api/topics/search/${search}`);
        setFilteredTopics(res.data);
        setTopicOffset(0);
    } catch (err) {
        console.log(err.response);
        alert("error searching")
    }
}

const clearSearch = (e) => {
  e.preventDefault();
  setFilteredTopics(topics);
  setSearch("")
}

  return (
    <ThemeProvider theme={theme} >
    <div className="messagePageContainer">
      <div className="flexOpposite">
      <h1>Message Board</h1>
      {auth.authenticated ? <Button variant="contained" onClick={handleOpen} style={{height:"40px", alignSelf: "center", borderRadius: "40px" }}>Create Topic</Button> : renderLoginBox()}
      </div>
        <div style={{width: "75vw", margin: "auto", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center"}} >
          <div style={{width: "60vw", margin: "10px"}} >
          <Input 
          fullWidth 
          startAdornment={<Icon>search</Icon>} 
          placeholder="Search by Title or Description" 
          value={search}
          onChange={(e)=>{setSearch(e.target.value)}}
          type="search" />
          </div>
          <Stack spacing={1} direction="row" >    
              <Button onClick={searchTopics} variant="contained" color="primary" style={{borderRadius: "40px" }}>Search</Button>
              <Button onClick={clearSearch} variant="outlined" style={{borderRadius: "40px" }}>Clear</Button>
          </Stack>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div><AddTopic addTopic={addTopic}/></div>
      </Modal>

      <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination-container"
        pageClassName="page-item"
        // pageLinkClassName="page-link"
        previousClassName="page-item"
        // previousLinkClassName="page-link"
        nextClassName="page-item"
        // nextLinkClassName="page-link"
      />
      {renderTopics()}
      </>
    </div>
    </ThemeProvider>
  )
}


export default MessageBoard;

