import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { authStore } from '../store/authStore';
import {
  formCard,
  formTitle,
  labelClass,
  inputClass,
  formGroup,
  submitBtn,
  pageWrapper
} from '../styles/common';

function AddArticle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const { currentUser } = authStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const articleObj = {
        ...data,
        author: currentUser._id,
      };

      const res = await axios.post('http://localhost:4000/author-api/articles', articleObj, {
        withCredentials: true
      });

      if (res.status === 201) {
        toast.success('Article published!');
        navigate('/');
      }
    } catch (err) {
      console.error('Error publishing article:', err);
      toast.error(err.response?.data?.message || 'Failed to publish article');
    }
  };

  return (
    <div className={pageWrapper}>
      <div className={formCard}>
        <h2 className={formTitle}>Create New Article</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={formGroup}>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              placeholder="Article title"
              {...register('title', { required: 'Title is required' })}
              className={inputClass}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Category</label>
            <select
              {...register('category', { required: 'Category is required' })}
              className={inputClass}
              defaultValue=""
            >
              <option value="" disabled>Select category</option>
              <option value="Programming">Programming</option>
              <option value="Tech">Tech</option>
              <option value="Life">Life</option>
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Content</label>
            <textarea
              placeholder="Write your article content here..."
              rows="10"
              {...register('content', { required: 'Content is required' })}
              className={`${inputClass} resize-none`}
            ></textarea>
            {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
          </div>

          <button
            type="submit"
            className={submitBtn}
          >
            Publish Article
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddArticle;