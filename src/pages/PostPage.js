import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'POST_REQUEST':
      return { ...state, loading: true };
    case 'POST_SUCCESS':
      return { ...state, loading: false, post: action.payload, error: '' };
    case 'POST_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function PostPage() {
  const { postId } = useParams();
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    post: { user: {} },
    error: '',
  });
  const { error, loading, post } = state;
  const loadBlog = async () => {
    dispatch({ type: 'POST_REQUEST' });
    try {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/posts/' + postId
      );
      const { data: userData } = await axios.get(
        'https://jsonplaceholder.typicode.com/users/' + data.userId
      );
      dispatch({ type: 'POST_SUCCESS', payload: { ...data, user: userData } });
    } catch (err) {
      dispatch({ type: 'POST_FAIL', payload: err.message });
    }
  };
  useEffect(() => {
    loadBlog();
  }, [postId]);

  return (
    <div>
      <Link to="/">Back to posts</Link>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="blog">
          <div className="content">
            <div>
              <h1>{post.title}</h1>
              <p>{post.body}</p>{' '}
            </div>
          </div>
          <div className="sidebar">
            <h2>{post.user.name}</h2>
            <p>Email: {post.user.email}</p>
            <p>Phone: {post.user.phone}</p>
            <p>Website: {post.user.website}</p>
          </div>
        </div>
      )}
    </div>
  );
}
