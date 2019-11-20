import React from 'react';
import '../../css/list.css'

const TweetBox = (props) => {
  return(
    
    <div className="owner-body">
      {props.children}
    </div>
  )
}

const Image = (props) => {
  return(
    <img src={props.image} alt="Logo" className="picture">
    </img>
  )
}

const Handle = (props) => {
  return(
    <div className="handle">
      {props.handle}
    </div>
  )
}

const Name = (props) => {
  return(
    <div className="name">
      {props.name}
    </div>
  )
}

const Tweet = (props) => {
  if(props.title!==undefined){
  return(
    <div className="tweet">
    <Title title={props.title}/> 
    {props.tweet} 
    <div style={{display:'inline-block'}}>
    <Members members={props.members}/>
    <Subscribers subscribers={props.subscribers}/>
    </div>
    </div>
  )}else{
    return(
      <div className="tweet">
      {props.tweet} 
      <br/>
      <div style={{display:'inline-block'}}>
       <Members members={props.members}/>{' '}{' '}
       <Subscribers subscribers={props.subscribers}/>
       </div>
       </div>
    )
  }
}

const Title = (props) => {
  if(props!==undefined){
  return(
  <p>{props.title}</p>
  )}
}

const Members = (props) => {
  if(props.members!==undefined){
  return(
   <p style={{display:'inline-block'}}>{props.members} members</p>
  )}else{
    return(
    <p style={{display:'inline-block'}}>0 members</p>
    )
  }
}

const Subscribers = (props) => {
  if(props.subscribers!==undefined){
  return(
   <p style={{display:'inline-block'}}>  {props.subscribers} susbribers</p>
  )}else{
    return(
    <p style={{display:'inline-block'}}>  0 subscribers</p>
    )
  }
}

const TweetBody = (props) => {
  return(
    <TweetBox>
      <div className="inner-body">
        <Image image={props.image}/>
        <div className="body">
          <div className="inner-body">
            <Name name={props.name}/>
            <Handle handle={props.handle}/>
          </div>
          <Tweet tweet={props.tweet}/>
        </div>
      </div>
    </TweetBox>
    
  )
}

export { TweetBody }