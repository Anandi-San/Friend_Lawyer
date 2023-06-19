import React, { useEffect } from 'react'
import MessageList from "../components/MessageList"
import Layout from './Layout'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../features/authSlice';

function MessageListPages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if(user && user.role !== "admin"){
      navigate("/dashboard")
    }
  }, [isError, user, navigate]);
  return (
    <Layout>
    <MessageList/>
    </Layout>
  )
}

export default MessageListPages