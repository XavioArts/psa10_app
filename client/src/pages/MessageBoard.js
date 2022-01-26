import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, FormControlLabel, FormGroup, Icon, Input, Paper, Stack, Switch } from "@mui/material";
import Modal from '@mui/material/Modal';
import AddTopic from '../components/AddTopic';
import { AuthContext } from '../providers/AuthProvider';
import ReactPaginate from 'react-paginate';
import ReactDOM from 'react-dom';

const MessageBoard = (props) => {
  const auth = useContext(AuthContext);
  const [topics, setTopics] = useState([])
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [expandedSearch, setExpandedSearch] = useState(false);
  const [currentTopics, setCurrentTopics] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [topicOffset, setTopicOffset] = useState(0);
  // const [pageTopics, setPageTopics] = useState([])
  // const [count, setCount] = useState(1)
  // const [per, setPer] = useState(1)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const topicsPerPage = 4

  const navigate = useNavigate()

  useEffect(()=>{
    getTopics()
  },[open])


  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = topicOffset + topicsPerPage;
    console.log(`Loading items from ${topicOffset} to ${endOffset}`);
    setCurrentTopics(filteredTopics.slice(topicOffset, endOffset));
    setPageCount(Math.ceil(filteredTopics.length / topicsPerPage));
  }, [topicOffset, topicsPerPage, filteredTopics]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * topicsPerPage) % topics.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setTopicOffset(newOffset);
  };

  const getTopics = async () => {
    try {
      let res = await axios.get(`/api/topics`);
      setTopics(res.data);
      setFilteredTopics(res.data)
      setCurrentTopics(res.data.slice(0, 4))
      setPageCount(Math.ceil(res.data.length / topicsPerPage));
      console.log(res.data)
      // let res_page = await axios.get('/api/allTopics')
      // setPageTopics(res_page.data.topic)
      // setCount(res_page.data.count)
      // setPer(res_page.data.per)
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
        <Paper key={t.id} elevation={5} onClick={()=>handleOnClick()} style={{ padding: '5px', border: '1px solid grey', borderRadius: '10px', margin: '20px', cursor: 'pointer' }}>
          <h6 style={{margin: '5px'}}>Posted by {t.user_nickname}</h6>
          <h3>{t.title}</h3>
          <p>{t.body}</p>
        </Paper>
      )
    })
    return topicBox
  }

  //   const renderTopics = (topics) => {
  //   let topicBox = topics.filter(t=>t.title.toUpperCase().includes(search.toUpperCase()) || (expandedSearch && t.body.toUpperCase().includes(search.toUpperCase())) ).map(t=>{
  //     const handleOnClick = () =>{
  //       navigate(`/messageboard/${t.id}`)
  //     }
  //     return(
  //       <Paper key={t.id} elevation={5} onClick={()=>handleOnClick()} style={{ padding: '5px', border: '1px solid grey', borderRadius: '10px', margin: '20px', cursor: 'pointer' }}>
  //         <h6 style={{margin: '5px'}}>Posted by {t.user_nickname}</h6>
  //         <h3>{t.title}</h3>
  //         <p>{t.body}</p>
  //       </Paper>
  //     )
  //   })
  //   return topicBox
  // }

  // const newPage = async (page) =>{
  //   try {
  //     let res = await axios.get(`/api/allTopics?page=${page}`)
  //     setPageTopics(res.data.topic)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // const renderButtons = () => {
  //   const numPage = Math.ceil(count/per) //expecting this to be 5
  //   const buttonarr = []
  //   for(let i = 1; i <=numPage; i ++){
  //     buttonarr.push(<button onClick={()=>newPage(i)}>{i}</button>)
  //   }
  //   return buttonarr
  // }

  const searchTopics = async (e) => {
    e.preventDefault();
    try {
        let res = await axios.get(`/api/topics/search/${search}`);
        console.log(res.data)
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
}

  // const handleOnChange = () => {
  //   setExpandedSearch(!expandedSearch)
  // }

  return (
    <div>
      <h1>Message Board</h1>
      {auth.authenticated ? <Button variant="contained" onClick={handleOpen}>Create Topic</Button> : renderLoginBox()}
      {/* <div style={{width: "75vw", margin: "auto", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center"}} >
        <div style={{width: "60vw", margin: "10px"}} >
                <Input 
                fullWidth 
                startAdornment={<Icon>search</Icon>} 
                placeholder={expandedSearch ? "Search by Title or Description" : "Search by Title"}
                value={search}
                onChange={(e)=>{setSearch(e.target.value)}}
                type="search" />
          <FormGroup style={{marginTop: '15px'}}>
            <FormControlLabel
              onChange={handleOnChange}
              control={<Switch />}
              label="Expand Your Search"
              />
          </FormGroup>
        </div>
      </div> */}
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
              <Button onClick={searchTopics} variant="contained" >Search</Button>
              <Button onClick={clearSearch} variant="outlined" >Clear</Button>
          </Stack>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div><AddTopic addTopic={addTopic}/></div>
      </Modal>

      <>
      {renderTopics()}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
      </>
    </div>
  )
}


export default MessageBoard;

