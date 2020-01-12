import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import "./ExportButton.css"

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function TransitionsModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Export
      </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>

                <Fade in={open}>
                    <div className={classes.paper}>
                        <h3 id="transition-modal-title">Export Options</h3>
                        <div className='slackAndEmailButton'>
                        <form className="emailForm">
                            <input className="slackLabel" type="radio" name="gender" value="male" /><label >Slack</label><br></br>
                            <label>Email: <input type="text" name="name" /></label><br />
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
          </div>
        </Fade>
      </Modal>
    </div >
  );
}


// import React from 'react';
// import { Dropdown, DropdownButton } from 'react-bootstrap';

// function ExportButton(){
//     return(
//         <div className="ExportButtonContainer">
//             <DropdownButton id="dropdown-item-button" title="Export">
//             <Dropdown.Item as="button">Slack</Dropdown.Item>
//             <Dropdown.Item as="button">Email</Dropdown.Item>
//             </DropdownButton>
//         </div>
//     )
// }

// export default ExportButton;

// import React, { Component } from "react";
// import Popup from "reactjs-popup";
// import './ExportButton.css'

// class ExportButton extends Component{
//     render(){
//         return(
//             <Popup trigger={<button className="button"> Export </button>} modal>
//               {close => (
//                 <div className="modal">
//                   <a className="close" onClick={close}>
//                     &times;
//                   </a>
//                   <div className="header"> Export options</div>
//                   <div className="content">
//                     {" "}
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
//                     Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
//                     delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
//                     <br />
//                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
//                     commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
//                     explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
//                   </div>
//                   <div className="actions">
//                     <Popup
//                       trigger={<button className="button"> Trigger </button>}
//                       position="top center"
//                       closeOnDocumentClick
//                     >
//                       <span>
//                         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
//                         magni omnis delectus nemo, maxime molestiae dolorem numquam
//                         mollitia, voluptate ea, accusamus excepturi deleniti ratione
//                         sapiente! Laudantium, aperiam doloribus. Odit, aut.
//                       </span>
//                     </Popup>
//                     <button
//                       className="button"
//                       onClick={() => {
//                         console.log("modal closed ");
//                         close();
//                       }}
//                     >
//                       close modal
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </Popup>
//           )
//                     }
// }

// export default ExportButton;