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

export default function TransitionsModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [clickSlack, setclickSlack] = React.useState(false);
    const [clickEmail, setclickEmail] = React.useState(false);
    const [email, setemail] = React.useState(null);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getCheckboxValue=(event)=> {
        const value = event.target.value;
        setclickSlack(value);
    };

    const getCheckboxValue1 =(event)=>{
        const Emailvalue = event.target.value;
        setclickEmail(Emailvalue);
    };

    const onClickHandler = () => {
        let emailEntered = null;
        if(clickEmail == 'on') {
            emailEntered = email;
            props.onfinishEmail(emailEntered)
        }
        if(clickSlack == 'on') {
            props.onfinishSlack()
        }
        console.log(props);
        // props.onfinish(clickSlack, emailEntered);
    }

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
                            <input className="slackLabel" name='slack' type="checkbox"  onClick={getCheckboxValue.bind(this)} /><label >Slack</label><br></br>
                            <input className="emailLabel" name='email' type="checkbox" onClick={getCheckboxValue1.bind(this)} /><label >Email</label><br></br>
                            <label>Email Address: <input type="text" onChange={(e)=>{setemail(e.target.value)}}  name="email" /></label><br />
                            <input type="button" value="Submit" onClick={onClickHandler} />
                        </form>
                    </div>
          </div>
        </Fade>
      </Modal>
    </div >
  );
}