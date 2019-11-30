import React from 'react';
import '../../css/hometweetlist.css';
const TweetBox = (props) => {
    return (
        <div className="tweet-body">
            {props.children}
        </div>
    )
};

const Image = (props) => {
    return (
        <img src={props.image} alt="Logo" className="picture">
        </img>
    )
};

const Handle = (props) => {
    return (
        <div className="handle">
            {props.handle}
        </div>
    )
};

const Name = (props) => {
    return (
        <div className="name">
            {props.name}
        </div>
    )
};

const Tweet = (props) => {
    return (
        <div className="tweet">
            {props.tweet}
        </div>
    )
};

const TweetBody = (props) => {
    return (
        <div class="list-group">
            <TweetBox>
                <button type="button" className="inner-body list-group-item list-group-item-action">
                    <Image image={props.image} />
                    <div className="body">
                        <div className="inner-body-inner">
                            <Name name={props.name} />
                            <Handle handle={props.handle} />
                        </div>
                        <Tweet tweet={props.tweet} />
                    </div>
                </button>
            </TweetBox>
        </div>
    )
};

export { TweetBody }