import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Input, TextField } from '@material-ui/core'
import "./SearchComp.css";

class SearchComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { redirect: false };
    }

    onGo = async () => {
        if (!this.state.queryValue) {
            return;
        }
        this.setState({ loading: true });
        const res = await fetch(`https://api-dot-nwfacts.appspot.com/search?keyword=${this.state.queryValue}`, {
    //const res = await fetch(`https://api-dot-nwfacts.appspot.com/search?keyword=trump`, {

            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          const results = await res.json();
          this.setState({ redirect: true, results: results});
    }

    handleChange = (event) => {
        this.state.queryValue = event.target.value;
    };

    renderBusySpinner() {
        if (this.state.loading) {
            return <div className="busySpinner2">
                <CircularProgress />
            </div>
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/app',
                state: { results: this.state.results, queryValue: this.state.queryValue }
            }} />
        } else {
            return <div className="searchBarComp" >
                {this.renderBusySpinner()}
                <form noValidate autoComplete="off" className="searchBoxContainer">
                    <div className="searchBox">
                        <TextField id="outlined-basic" label="Search News" variant="outlined" fullWidth="true" onChange={this.handleChange} />
                    </div>
                </form>
                <Button variant="contained" color="primary" onClick={this.onGo}>
                    Go!
            </Button>
            </div>
        }

    }
}

export default SearchComp;