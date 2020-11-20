import React, { useEffect } from 'react';
import { Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/actions/postsActions';

const Posts = () => {

  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const user = useSelector(state => state.users.userInfo);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, posts]);

  return (
    <>
      <h2 className='pb-3'>List of posts</h2>
      {posts && posts.map(post => {
        return (
          <Media
            className='border mb-4'
            key={post._id}
          >
            {!post.image ? <img
              width={90}
              height={90}
              className="mr-5"
              src="https://png.pngtree.com/png-vector/20190116/ourlarge/pngtree-vector-chat-icon-png-image_322158.jpg"
              alt="Generic placeholder"
            /> : <img
              width={90}
              height={90}
              className="mr-5"
              src={`http://localhost:8000/uploads/${post.image}`}
              alt="Generic placeholder"
            /> }
            <Media.Body>
              <p>{post.datetime} <strong>by {post.user.username}</strong></p>
              {!user ? <h3>{post.title}</h3> :
                <h3><Link to={`/posts/${post._id}`}>{post.title}</Link></h3>
              }
            </Media.Body>
          </Media>
        );
      })}
    </>
  );
};

export default Posts;