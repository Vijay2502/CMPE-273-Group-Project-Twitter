import React from 'react';
import '../../../css/hometweetlist.css';
const ListBox = (props) => {
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


const ListBody = (props) => {
    return (

            <ListBox>
                <div className="inner-body list-group-item-action">

                    {props.list.owner.data && props.list.owner.data.profilePic? (<Image image={props.list.owner.data.profilePic} />) : (<Image image="https://thefader-res.cloudinary.com/private_images/w_760,c_limit,f_auto,q_auto:best/TwitterLogo__55acee_jntmic/twitter-applications-verified.jpg" />)}
                    <div className="body">
                        <div className="inner-body-inner">
                            <Name name={`${props.list.owner.firstName} ${props.list.owner.lastName}`} />
                            <Handle handle={`${props.list.owner.username}`} />
                        </div>
                        <h3><strong>{props.list.name}</strong></h3>
                        <p className="text-muted">{`${props.list.description.slice(25)}...`}</p>
                    </div>
                </div>
            </ListBox>

    )
};

export { ListBody }