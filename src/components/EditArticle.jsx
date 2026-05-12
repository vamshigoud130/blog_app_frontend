import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { authStore } from '../store/authStore';
import {
  formCard,
  formTitle,
  labelClass,
  inputClass,
  formGroup,
  submitBtn,
  pageWrapper,
  loadingClass
} from '../styles/common';

function EditArticle() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  
  const { currentUser } = authStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:4000/user-api/article/${id}`, {
          withCredentials: true
        });
        const article = res.data.payload;
        
        // Verify ownership (optional extra check on frontend)
        if (article.author._id !== currentUser._id) {
            toast.error("You can only edit your own articles.");
            navigate('/');
            return;
        }

        setValue('title', article.title);
        setValue('category', article.category);
        setValue('content', article.content);
      } catch (err) {
        console.error('Error fetching article:', err);
        toast.error('Failed to load article data');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchArticle();
    }
  }, [id, currentUser, setValue, navigate]);

  const onSubmit = async (data) => {
    try {
      const articleObj = {
        articleId: id,
        ...data
      };

      const res = await axios.put('http://localhost:4000/author-api/articles', articleObj, {
        withCredentials: true
      });

      if (res.status === 201) {
        toast.success('Article updated successfully!');
        navigate(`/article/${id}`);
      }
    } catch (err) {
      console.error('Error updating article:', err);
      toast.error(err.response?.data?.message || 'Failed to update article');
    }
  };

  if (loading) {
    return (
      <div className={pageWrapper}>
        <div className={loadingClass}>Loading article data...</div>
      </div>
    );
  }

  return (
    <div className={pageWrapper}>
      <div className={formCard}>
        <h2 className={formTitle}>Edit Article</h2>

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
            Update Article
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditArticle;
