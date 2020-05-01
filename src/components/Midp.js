import React, { Component } from "react";
import {  getUser } from "../Utils/Common";
import Popup from './Popup';
import SanitizedHTML from 'react-sanitized-html';
import fav from "../images/fav.png";

  const user = getUser();
  class Midp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showPopup: false,
        posts: [],
        users: [],
        isLoading: false,
        friend_post: [],
      };
    }
    togglePopup() {
      this.setState({
        showPopup: !this.state.showPopup
      });
    }
  componentDidMount() {
    this.setState({ isLoading: true });
    this._isMounted = true;
    fetch(`http://teenagerstartups.com/media/featured-story-list/3`)
      .then((response) => response.json())
      .then((data) => {
        if (this._isMounted) {
          this.setState({ posts: data, isLoading: false });
        
        }
      });
    }
    addPost = (id) => {
      const post = { post_content: this.state.postContent, user_id: id };
      const url = `http://teenivoapi.herokuapp.com/notification/addpost/`;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(post),
      }).then((response) => {
        if (response.ok) {
          this.fetchFriendsPosts();
        }
      });
    };
  
    fetchFriendsPosts = () => {
      const user = getUser();
      if (user.length !== 0) {
        const id = user.id;
        const url = `http://teenivoapi.herokuapp.com/notification/posts/${id}`;
        fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }).then((response) => {
          if (response.statusText === "OK") {
            this.setState({ friend_post: response.data }, () =>
              console.log(response)
            );
          }
        });
      }
    };



  
  render() {
    const { posts, isLoading, users } = this.state;
    
    return (
    <>
      
      {this.state.showPopup ?
         <Popup
          
          closePopup={this.togglePopup.bind(this)}
         />
         : null
       }
      
      <div className="posts">
         <div className="col-12">

       
         <div className="postb" onClick={this.togglePopup.bind(this)} >Post Teenku</div> 
            <div className="card"> 
            <div className="bl">
        <div className="sort">
          Sort By Top
        </div>
        </div>   
        <div className="cf">
        
         {posts.map((post, index) => (
           
             <div className="card-body" key={index}>
            
               
             <h6 className="card-title">
             <img className="fav" src={fav} alt="icon" />&nbsp;Featured Story from Teenager startups
             </h6>
               <img
                 src={post.entrepreneur_image}
                 alt="entrepreneur"
                 className="post-img"
               ></img>
               
               <h6 className="card-title text-blue">{post.title}</h6>
               <h6 className="card-subtitle mb-2 text-muted">
               
                By {post.contributor_name} and {post.contributor_name_2}
               </h6>
               <p className="card-text">{post.story_abstract}</p>
               <h6 className="card-subtitle mb-2 text-muted text-right" >
                 Featured Story {post.story_published_at}
               </h6>

               <SanitizedHTML 
               allowedAttributes={{ 'iframe': ['src'] }}
  allowedTags={['iframe']}
  html={ post.embedded_code }/>
  


             </div>
             
           
           
         ))}
         </div>       
          </div> 
          </div>
          </div>
          </>
       )
         }
}

export default Midp;