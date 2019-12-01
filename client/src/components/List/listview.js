import React from 'react';
import '../../css/list.css';
import {Link} from 'react-router-dom';

const TweetBox = (props) => {
    return (

        <div className="owner-body">
            {props.children}
        </div>
    )
};

const Image = (props) => {
    return (
        <img src={props.image} alt="Logo" className="picture-list">
        </img>
    )
};

const Handle = (props) => {
    return (
        <div className="handle-list">
            {props.handle}
        </div>
    )
};

const Name = (props) => {
    return (
        <div class="name-list">
            {props.name}
        </div>
    )
};

const Tweet = (props) => {
    console.log("Tweet",props);
    if (props.tweet.description !== undefined) {
        console.log("Tweet if",props.tweet.name);
        return (
            <div class="tweet-list">
                <Title title={props.tweet} />
                {/* <Link to={{ pathname: '/cart', state: {res:res}}}>{res.name}</Link> */}
                   <p>{props.tweet.description}</p> 
                <div style={{ display: 'inline-block' }}>
                    <Members members={props.tweet.members} />
                    <Subscribers subscribers={props.tweet.subscribers} />
                </div>
            </div>
        )
    } else {
        console.log("Tweet return");
        return (
            <div className="tweet-list">
                    <Title title={props} />
                <br />
                <div style={{ display: 'inline-block' }}>
                    <Members members={props.tweet.members} />{' '}{' '}
                    <Subscribers subscribers={props.tweet.subscribers} />
                </div>
            </div>
        )
    }
};

const Title = (props) => {
    console.log("title props",props.title)
    if (props !== undefined) {
        return (
           <div> <Link style={{color:"black"}} to={{  pathname: '/listtweet',state: { tweetId: props.title.id}}}>
            {props.title.name}
            </Link></div>
        )
    }
};

const Members = (props) => {
    if (props.members !== undefined) {
        return (
            <p style={{ display: 'inline-block' }}>{props.members} members</p>
        )
    } else {
        return (
            <p style={{ display: 'inline-block' }}>0 members</p>
        )
    }
};

const Subscribers = (props) => {
    if (props.subscribers !== undefined) {
        return (
            <p style={{ display: 'inline-block' }}>  {props.subscribers} susbribers</p>
        )
    } else {
        return (
            <p style={{ display: 'inline-block' }}> 0 subscribers</p>
        )
    }
};

const ListBody = (props) => {
    return (
        <div class="list-group">
            <TweetBox>
            {/* type="button"  */}
                <div className="inner-body-list list-group-item list-group-item-action">
                    <Image image={props.image} />
                    <div className="body">
                        <div className="inner-body-inner-list">
                            <Name name={props.name} />
                            <Handle handle={props.handle} />
                        </div>
                        <Tweet tweet={props.tweet} />
                    </div>
                </div >
            </TweetBox>
        </div>
    )
};

export { ListBody }