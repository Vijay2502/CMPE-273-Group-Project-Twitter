import React from 'react';
import '../../../css/hometweetlist.css';
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
                     {props.user.data && props.user.data.profileImage ? (<Image image={props.user.data.profileImage} />) : (<Image image="https://thefader-res.cloudinary.com/private_images/w_760,c_limit,f_auto,q_auto:best/TwitterLogo__55acee_jntmic/twitter-applications-verified.jpg" />)}
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