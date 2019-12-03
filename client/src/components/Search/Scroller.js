import React, { Component } from 'react';

class Scroller extends Component {
    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }
    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }
    onScroll = () => {
      if (
        (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) && this.props.hasMore &&!this.props.isLoading
      ) {
        this.props.onLoadMore();
      }
    }
    render() {
      return (
        <div style={{height:"700px",overflow:"auto"}} ref={(ref) => this.scrollParentRef = ref}>
            {this.props.children}
        </div>
      )
    };
  }

  export default Scroller;