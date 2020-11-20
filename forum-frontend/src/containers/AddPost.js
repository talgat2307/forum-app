import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createPost } from '../store/actions/postsActions';

const AddPost = (props) => {
  const dispatch = useDispatch();

  const [post, setPost] = useState({
    title: '',
    description: '',
    image: '',
  });

  const inputChangeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    setPost(prevState => {
      return { ...prevState, [name]: value };
    });
  };
  const fileChangeHandler = e => {
    const name = e.target.name;
    const file = e.target.files[0];

    setPost(prevState => ({ ...prevState, [name]: file }));
  };

  const submitFormHandler = e => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(post).forEach(key => {
      formData.append(key, post[key]);
    });

    dispatch(createPost(formData));
    props.history.push('/');
  };

  return (
    <div>
      <Container>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <h2 className='py-4'>Add new post</h2>
            <Form onSubmit={(e) => submitFormHandler(e)}>
              <Form.Group controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type='text'
                  name='title'
                  value={post.title}
                  onChange={(e) => inputChangeHandler(e)}
                >
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='textarea'>
                <Form.Label>Description</Form.Label>
                <textarea
                  className='form-control'
                  rows='6'
                  name='description'
                  value={post.description}
                  onChange={(e) => inputChangeHandler(e)}
                >
                </textarea>
              </Form.Group>
              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.File
                  name='image'
                  onChange={fileChangeHandler}
                />
              </Form.Group>

              <Button className='mt-3' type='submit' variant='primary'>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddPost;