import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getToken, removeUserSession, setUser, getUser } from "../Utils/Common";
import axios from "axios";

export default class Feed extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      users: [],
      isLoading: false,
      friend_post: [],
    };
  }

  handleLogout = () => {
    removeUserSession();
    this.props.history.push("/sign-in");
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this._isMounted = true;
    fetch(`http://teenagerstartups.com/media/featured-story-list`)
      .then((response) => response.json())
      .then((data) => {
        if (this._isMounted) {
          this.setState({ posts: data, isLoading: false });
        }
      });
    fetch(`http://teenivoapi.herokuapp.com/rest-auth/user/`, {
      method: "GET",
      headers: {
        Authorization: "Token " + getToken(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (this._isMounted) {
          this.setState({ users: data, isLoading: false });
        }
      })
      .then(() => setUser(JSON.stringify(this.state.users)))
      .then(() => this.fetchFriendsPosts());
    // this.addPost(response.data.profile_id);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const user = getUser();
    if (user.length !== 0) {
      const id = user.id;
      axios
        .get(`http://teenivoapi.herokuapp.com/accounts/profilesId/${id}`)
        .then((response) => {
          if (response.statusText === "OK") {
            this.addPost(response.data.profile_id);
          } else {
            console.log("Please, first create your profile!!");
          }
        });
    }
  };

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
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div className="container clearfix">
        <div className="posts">
          <p>
            Welcome,
            <Link to="/myProfile">
              {users.first_name} {users.last_name}
            </Link>
          </p>
          <div className="col-md-2 menu">
            <Link to={"/create-profile"}>
              <button type="submit" className="btn btn-primary">
                Create Profile
              </button>
            </Link>
            <Link to={"/sign-in"}>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleLogout}
              >
                Sign Out
              </button>
            </Link>
            <Link to={"/change-password"}>
              <button type="submit" className="btn btn-primary">
                Change Password
              </button>
            </Link>
          </div>
          <div className="col-12 mtb">
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="register-form">
                <div className=" form-label-group">
                  <textarea
                    rows="3"
                    id="post-content"
                    className="form-control"
                    name="postContent"
                    placeholder="Post your content here"
                    onChange={this.handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block col-md-4"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
          {/* <div className="col-12">
            {this.state.friend_post.map((post) => (
              <div className="card" key={post.post_id}>
                <div className="card-body">
                  <h5 className="card-title">{post.post_content}</h5>
                </div>
              </div>
            ))}
          </div> */}
          <div className="col-12">
            {posts.map((post, index) => (
              <div className="card" key={index}>
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <img
                    src={post.entrepreneur_image}
                    alt="entrepreneur"
                    className="post-img"
                  ></img>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Featured Story {post.story_published_at}
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    By {post.contributor_name} and {post.contributor_name_2}
                  </h6>
                  <p className="card-text">{post.story_abstract}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
