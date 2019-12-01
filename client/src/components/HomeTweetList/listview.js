import React, { Component } from "react";
import '../../css/hometweetlist.css';
import { Route, Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";


class TweetBox extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }



    render() {
        return (
            <div className="tweet-body" >
                {this.props.children}
            </div>
        )
    }

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



// const TweetBody = (props) => {
//     return (
//         <div class="list-group">
//             <TweetBox onClick={(e) => this.displayTweet(e)}>
//                 <button type="button" className="inner-body list-group-item list-group-item-action">
//                     <Image image={props.image} />
//                     <div className="body">
//                         <div className="inner-body-inner">
//                             <Name name={props.name} />
//                             <Handle handle={props.handle} />
//                         </div>
//                         <Tweet tweet={props.tweet} />
//                     </div>
//                 </button>
//             </TweetBox>
//             <TweetBox>
//                 <button type="button" className="inner-body list-group-item list-group-item-action">
//                     <Image image={props.image} />
//                     <div className="body">
//                         <div className="inner-body-inner">
//                             <Name name={props.name} />
//                             <Handle handle={props.handle} />
//                         </div>
//                         <Tweet tweet={props.tweet} />
//                     </div>
//                 </button>
//             </TweetBox>
//         </div>
//     )
// };



class TweetBody extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirectToTweet: false
        }
        this.displayTweet = this.displayTweet.bind(this);
    }

    displayTweet() {

        try {
            document.querySelector("#root > div > div > div > div > div.col-lg-3 > div > div > div > button:nth-child(7)").click();

        }
        catch (e) {
            console.log(e);
        }


    }

    render() {

        console.log(this.state);
        return (
            <div class="list-group">
                <button type="button" className="inner-body list-group-item list-group-item-action" onClick={(e) => this.displayTweet()}>
                    <Image image={this.props.image} />
                    <div className="body">
                        <div className="inner-body-inner">
                            <Name name={this.props.name} />
                            <Handle handle={this.props.handle} />
                        </div>
                        <Tweet tweet={this.props.tweet} />
                    </div>
                </button>

            </div>
        )
    }

}




export default TweetBody;