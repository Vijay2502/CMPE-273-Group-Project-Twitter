import React, { Component } from 'react';
import { PullDownContent, PullToRefresh, RefreshContent, ReleaseContent } from "react-js-pull-to-refresh";
import '../../css/list.css'
import { ListBody } from './listview.js'
import { connect } from "react-redux";
import { signUp } from "../../redux/actions/authActions";
import { getOwnedLists } from "../../redux/actions/listActions";


function mapStateToProps(store) {
    return {
        signupSuccess: store.auth.signupSuccess,
        signupMessage: store.auth.signupMessage,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getOwnedLists: (id) => dispatch(getOwnedLists(id))
    };
}

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isOwner: true,
            isSubscriber: false,
            isMember: false
        };

        this.handleRefresh = this.handleRefresh.bind(this);
        this.getUser = this.getUser.bind(this)
    }

    handleRefresh() {
        //dispatch
        return new Promise((resolve) => {
            this.getUser()
        });
    }

    componentWillMount() {
        this.getUser()
    }

    getUser() {
        //fetch list
        this.props.getOwnedLists(6);
        // fetch('https://randomuser.me/api/')
        //     .then(response => {
        //         if (response.ok) return response.json();
        //         throw new Error('Request failed.');
        //     })
        //     .then(data => {
        //         this.setState({
        //             users: [
        //                 {

        //                     name: data.results[0].name,
        //                     image: data.results[0].picture.medium,
        //                     tweet: data.results[0].email,
        //                 },
        //                 ...this.state.users,
        //             ]
        //         });
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }

    showOwnerBox() {
        this.setState({ isOwner: true, isSubscriber: false, isMember: false });
    }

    showSubscriberBox() {
        this.setState({ isOwner: false, isSubscriber: true, isMember: false });
    }

    showMemberBox() {
        this.setState({ isOwner: false, isSubscriber: false, isMember: true });
    }

    showContent() {
        let content = this.state.users.map((user, index) => {
            let name = `${user.name.first} ${user.name.last}`;
            let handle = `@${user.name.first}${user.name.last}`;
            let image = user.image;
            let tweet = user.tweet;
            console.log(image);
            return (
                <ListBody
                    key={index}
                    name={name}
                    handle={handle}
                    tweet={tweet}
                    image={image} />

            )
        });
        return content;
    }


    render() {
        return (

            <PullToRefresh
                class="list-mail-container"
                pullDownContent={<PullDownContent />}
                releaseContent={<ReleaseContent />}
                refreshContent={<RefreshContent />}
                pullDownThreshold={2}
                onRefresh={this.handleRefresh}
                triggerHeight={50}>
                <div className="main-body">
                    <div className="list-body">
                        <div className="box-controller">
                            <div
                                className={"controller " + (this.state.isOwner
                                    ? "selected-controller"
                                    : "")}
                                onClick={this
                                    .showOwnerBox
                                    .bind(this)}>
                                Owned
                            </div>
                            <div
                                className={"controller " + (this.state.isSubscriber
                                    ? "selected-controller"
                                    : "")}
                                onClick={this
                                    .showSubscriberBox
                                    .bind(this)}>
                                Subsribers
                            </div>
                            <div
                                className={"controller " + (this.state.isMember
                                    ? "selected-controller"
                                    : "")}
                                onClick={this
                                    .showMemberBox
                                    .bind(this)}>
                                Members
                            </div>
                        </div>
                    </div>
                    {[...this.state.users].map((user, index) => {
                        let name = `${user.name.first} ${user.name.last}`;
                        let handle = `@${user.name.first}${user.name.last}`;
                        let image = user.image;
                        let tweet = user.tweet;
                        console.log(image);
                        return (
                            <ListBody
                                key={index}
                                name={name}
                                handle={handle}
                                tweet={tweet}
                                image={image} />
                        )
                    })}
                </div>
            </PullToRefresh>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);

