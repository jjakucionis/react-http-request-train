import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        postData: null
    }

    componentDidUpdate() {
        if(this.props.postId) {
            if(!this.state.postData || (this.state.postData && this.props.postId !== this.state.postData.id)) {
                axios.get(`https://jsonplaceholder.typicode.com/posts/${this.props.postId}` )
                    .then(response => {
                            this.setState({
                                postData: response.data
                            })
                        }
                        
                    )
            }
        }
    }

    deletePostHandler = () => {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${this.props.postId}`)
            .then(response => {
                console.log(response)
            });
    }

    render () {
        let post = <p style={{textAlign: "center"}}>Please select a Post!</p>;
        if(this.props.postId) {
            post = <p style={{textAlign: "center"}}>Loading...</p>;
        }
        if(this.state.postData) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.postData.title}</h1>
                    <p>{this.state.postData.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>

            );
        }

        return post;
    }
}

export default FullPost;