import React from 'react';
import '../../css/list.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

let members=[]
let subscribers=[]
const ListBox = (props) => {
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

const List = (props) => {
    if (props.tweet.description !== undefined) {
        return (
            <div class="tweet-list">
                <Title title={props.tweet} />
                {/* <Link to={{ pathname: '/cart', state: {res:res}}}>{res.name}</Link> */}
                   <p>{props.tweet.description}</p> 
                <div style={{ display: 'inline-block' }}>
                    <Members members={props.tweet} />
                    <Subscribers subscribers={props.tweet} />
                </div>
            </div>
        )
    } else {
        return (
            <div className="tweet-list">
                    <Title title={props} />
                <br />
                <div style={{ display: 'inline-block' }}>
                    <Members members={props.tweet} />{' '}{' '}
                    <Subscribers subscribers={props.tweet} />
                </div>
            </div>
        )
    }
};

const Title = (props) => {
    if (props !== undefined) {
        return (
           <div> <Link style={{color:"black"}} to={{  pathname: '/listtweet',
           state: { listId: props.title.id,list:props.title}}}>
            {props.title.name}
            </Link></div>
        )
    }
};

const Members = (props) => {
    axios.get(`http://localhost:8080/api/v1/list/${props.members.id}/members`)
        .then(response => {
            console.log("members count",response.data.data.members);
            members = response.data.data.members    
        })
        .catch(err => {
            console.error(err);
        });
    return (
                <p style={{ display: 'inline-block' }}> {members.length} members</p>
            )
};

const Subscribers = (props) => {

    axios.get(`http://localhost:8080/api/v1/list/${props.subscribers.id}/subscribers`)
        .then(response => {
            console.log(" subscribers  count",response.data.data.subscribers );
            subscribers = response.data.data.subscribers
        })
        .catch(err => {
            console.error(err);
        });
    return (
        <p style={{ display: 'inline-block' }}> {subscribers.length} subscribers</p>
    )
};

const ListBody = (props) => {
    return (
        <div class="list-group">
            <ListBox>
            {/* type="button"  */}
                <div className="inner-body-list list-group-item list-group-item-action">
                    <Image image={props.image} />
                    <div className="body">
                        <div className="inner-body-inner-list">
                            <Name name={props.name} />
                            <Handle handle={props.handle} />
                        </div>
                        <List tweet={props.tweet} />
                    </div>
                </div >
            </ListBox>
        </div>
    )
};

export { ListBody }