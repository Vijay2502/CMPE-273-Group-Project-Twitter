import React from 'react';
import '../../css/list.css'

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
    if (props.title !== undefined) {
        return (
            <div class="tweet-list">
                <Title title={props.title} />
                {props.tweet}
                <div style={{ display: 'inline-block' }}>
                    <Members members={props.members} />
                    <Subscribers subscribers={props.subscribers} />
                </div>
            </div>
        )
    } else {
        return (
            <div className="tweet-list">
                {props.tweet}
                <br />
                <div style={{ display: 'inline-block' }}>
                    <Members members={props.members} />{' '}{' '}
                    <Subscribers subscribers={props.subscribers} />
                </div>
            </div>
        )
    }
};

const Title = (props) => {
    if (props !== undefined) {
        return (
            <p>{props.title}</p>
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
                <button type="button" className="inner-body-list list-group-item list-group-item-action">
                    <Image image={props.image} />
                    <div className="body">
                        <div className="inner-body-inner-list">
                            <Name name={props.name} />
                            <Handle handle={props.handle} />
                        </div>
                        <Tweet tweet={props.tweet} />
                    </div>
                </button >
            </TweetBox>
        </div>
    )
};

export { ListBody }