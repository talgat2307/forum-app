import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSinglePost } from '../store/actions/postsActions';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { createComment, fetchComments } from '../store/actions/commentsActions';

const PostDetails = ({ match }) => {
  const [comment, setComment] = useState({
    post: '',
    comment: '',
  });

  const dispatch = useDispatch();
  const post = useSelector(state => state.posts.singlePost);
  const comments = useSelector(state => state.comments.comments);

  useEffect(() => {
    dispatch(fetchSinglePost(match.params.id));
  }, [dispatch, match.params.id]);

  const inputChangeHandler = (e) => {
    setComment(prevState => {
      return {
        ...prevState,
        post: post._id,
        comment: e.target.value,
      };
    });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    dispatch(createComment(comment));

    setComment({
      post: '',
      comment: '',
    });
  };

  useEffect(() => {
    dispatch(fetchComments(match.params.id));
  }, [dispatch, match.params.id, comment]);

  return (
    <>
      <h3 className='py-3'>{post && post.title}</h3>
      <p className='py-3'>{post && post.description}</p>
      <hr/>
      <div>
        <h4 className='py-3'>Comments</h4>
        <ul>
          {comments && comments.map(comment => {
            return (
              <div key={comment._id}>
                {comment.post === post._id ? <li >{comment.comment}</li> : ''}
              </div>
            );
          })}
        </ul>
      </div>
      <hr/>
      <Row>
        <Col xs={12} md={6}>
          <h4 className='py-4'>Add new comment</h4>
          <Form onSubmit={(e) => submitFormHandler(e)}>
            <Form.Group controlId='comment'>
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type='text'
                value={comment.comment}
                onChange={(e) => inputChangeHandler(e)}
              >
              </Form.Control>
            </Form.Group>

            <Button className='mt-3' type='submit' variant='primary'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default PostDetails;