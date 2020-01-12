import React from 'react';
import Button from '@material-ui/core/Button';
import { Input, TextField } from '@material-ui/core'
import "./SearchComp.css";

class SearchComp extends React.Component {
    render() {
        return <div className="searchBarComp" >
                <form noValidate autoComplete="off" className="searchBoxContainer">
                    <div className="searchBox">
                        <TextField id="outlined-basic" label="Search News" variant="outlined" fullWidth="true" />
                    </div>
                </form>
                <Button variant="contained" color="primary">
                        Go!
                </Button>
        </div>
    }
}

export default SearchComp;