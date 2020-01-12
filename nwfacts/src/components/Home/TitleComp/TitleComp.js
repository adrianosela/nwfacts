import React, { useState } from 'react'
import "./TitleComp.css";
import Typography from '@material-ui/core/Typography';

class TitleComp extends React.Component {
    render() {
        return <Typography variant="h2" component="h3" className="newsCompTitle">
                {this.props.title}
        </Typography>
    }
}

export default TitleComp;