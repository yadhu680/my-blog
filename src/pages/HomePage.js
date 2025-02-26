import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'POSTS_REQUEST':
      return { ...state, loading: true };
    case 'POSTS_SUCCESS':
      return { ...state, loading: false, posts: action.payload, error: '' };
    case 'POSTS_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'USERS_REQUEST':
      return { ...state, loadingUser: true };
    case 'USERS_SUCCESS':
      return {
        ...state,
        loadingUser: false,
        users: action.payload,
        errorUser: '',
      };
    case 'USER_SUCCESS':
      return {
        ...state,
        loadingUser: false,
        user: action.payload,
        errorUser: '',
      };
    case 'USERS_FAIL':
      return { ...state, loadingUser: false, errorUser: action.payload };
    default:
      return state;
  }
};
export default function HomePage() {
  const { query, userId } = useParams();
  const [state, dispath] = useReducer(reducer, {
    loading: false,
    error: '',
    posts: [],
    loadingUser: false,
    errorUser: '',
    users: [],
    user: {},
  });
  const { error, loading, posts, users, loadingUser, errorUser, user } = state;
  const loadPosts = async () => {
    dispath({ type: 'POSTS_REQUEST' });
    try {
      const { data } = await axios.get(
        userId
          ? 'https://jsonplaceholder.typicode.com/posts?userId=' + userId
          : 'https://jsonplaceholder.typicode.com/posts'
      );
      const filteredPosts = query
        ? data.filter(
            (x) => x.title.indexOf(query) >= 0 || x.body.indexOf(query) >= 0
          )
        : data;
      dispath({ type: 'POSTS_SUCCESS', payload: filteredPosts });
    } catch (err) {
      dispath({ type: 'POSTS_FAIL', payload: err.message });
    }
  };
  const loadUsers = async () => {
    dispath({ type: 'USERS_REQUEST' });
    try {
      const { data } = await axios.get(
        userId
          ? 'https://jsonplaceholder.typicode.com/users/' + userId
          : 'https://jsonplaceholder.typicode.com/users'
      );
      dispath({
        type: userId ? 'USER_SUCCESS' : 'USERS_SUCCESS',
        payload: data,
      });
    } catch (err) {
      dispath({ type: 'USERS_FAIL', payload: err.message });
    }
  };
  useEffect(() => {
    loadPosts();
    loadUsers();
  }, [query, userId]);
  return (
    <div className="blog">
      <div className="content">
        <h1>
          {' '}
          {query
            ? `Results for "${query}"`
            : userId
            ? `${user.name}'s Posts`
            : 'Posts'}
        </h1>
        {loading ? (
          <div>Loading....</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : posts.length === 0 ? (
          <div>No Post found </div>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="sidebar">
        {loadingUser ? (
          <div>Loading....</div>
        ) : errorUser ? (
          <div>Error: {error}</div>
        ) : users.length === 0 ? (
          <div>No user found </div>
        ) : userId ? (
          <div>
            <h2>{user.name}'s Profile</h2>
            <ul>
              <li>Email: {user.email}</li>
              <li>Phone: {user.phone}</li>
              <li>Website: {user.website}</li>
            </ul>
          </div>
        ) : (
          <div>
            <h2>Authors</h2>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <Link to={`/user/${user.id}`}>{user.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
