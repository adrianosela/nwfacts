import React, { Component } from 'react'

import { TwitterTweetEmbed } from 'react-twitter-embed';
import ScrollArea from '@xico2k/react-scroll-area';


import "./TwitterFeedComp.css"

const loop = function(tweets) {
    const arr = []
    for (let id = 0; id < tweets.length; id++) {
        arr.push(<TwitterTweetEmbed
            key={id}
            tweetId={tweets[id]}
        />)
    }
    return arr
}

class TwitterFeedComp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            ready: false
        }
    }
    componentDidMount() {
        fetch('https://febg.api.stdlib.com/http-project@dev/twitter-get/?keywords='+this.props.query,  {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              }).then(response => response.json()).then(data => {
                  console.log('data', data)
                  this.setState({ tweets: data.tweets })
                })
        
    }
    render () {
        return (
            <div className="TwitterFeedCompContainer">
            <div className="title1">Twitter</div>
                <div className="twitterCard">
                    <ScrollArea>
                        {loop(this.state.tweets)}
                    </ScrollArea>
                </div>
            </div>
        )
    }
}

export default TwitterFeedComp;