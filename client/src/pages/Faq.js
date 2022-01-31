import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Faq = () => {

  const simpleAccordion= () =>{
    return (
      <div >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="q_text">How do I start adding my collectibles?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            
              <p><strong>There are 2 ways:</strong> </p>
              <p>1. Click the "UPLOAD" button on the top menu bar. From here, create a new collection or choose one of your existing collections where 
                you want to add your collectible(s). Once you've selected or created a category, click "ADD A NEW COLLECTIBLE" 
                to upload your photos and information.</p>
              <p>2. Go to your collections page by cicking "MY COLLECTIONS" from the top menu bar OR by clicking the "Collections" tab from your profile.
                From your collections page, either add a new collection or click one of your existing collections. From the individual collection page, 
                click "ADD A NEW COLLECTIBLE" to upload your photos and information.</p>  
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className="q_text">Accordion 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className="q_text">What is the difference between collections, showcases and sets?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>Collections</strong> are categories that you'll personally create in order to organize your collectibles. For example, you 
              may have a collection of "Baseball Cards", "Japanese Pokemon Cards", and "Beanie Babies" while another user might 
              choose collection names like "My Rarest Basketball Cards" and "Autographed Balls."
              <strong>Showcases</strong> are for showing off the collectibles of which you're most proud. 
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );}


  return (
    <div className="faq_page">
      <h3>Frequently Asked Questions</h3>
      {simpleAccordion()}


    </div>
  )
}

export default Faq;