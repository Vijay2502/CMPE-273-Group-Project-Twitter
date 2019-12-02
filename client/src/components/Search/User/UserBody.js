import React from 'react';
import '../../css/hometweetlist.css';
const UserBox = (props) => {
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


const UserBody = (props) => {
    return (
        <div class="list-group">
            <UserBox>
                <button type="button" className="inner-body list-group-item list-group-item-action">
                    <Image image={props.user.data.image} />
                    <div className="body">
                        <div className="inner-body-inner">
                            <Name name={props.user.firstName + " " + props.user.lastName} />
                            <Handle handle={`@${props.user.username}`} />
                        </div>                        
                    </div>
                </button>
            </UserBox>
        </div>
    )
};

export { UserBody }