import React, {useEffect} from 'react'
import Layout from './Layout'
import FormAddDiscussion from '../components/FormAddDiscussion'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const AddDiscussion = () => {
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
        <FormAddDiscussion/>
    </Layout>
  )
}

export default AddDiscussion