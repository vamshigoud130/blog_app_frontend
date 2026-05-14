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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://blog-app-backend-1-5vj1.onrender.com/user-api/article/${id}`, {
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

      const res = await axios.put('https://blog-app-backend-1-5vj1.onrender.com/author-api/articles', articleObj, {
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

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      const res = await axios.patch(
        `https://blog-app-backend-1-5vj1.onrender.com/author-api/articles/${id}`,
        {},
        { withCredentials: true }
      );

      if (res.status === 201) {
        toast.success('Article deleted successfully!');
        navigate('/');
      }
    } catch (err) {
      console.error('Error deleting article:', err);
      toast.error(err.response?.data?.message || 'Failed to delete article');
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
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

        <button
          type="button"
          onClick={handleDeleteClick}
          className="w-full px-4 py-2 mt-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Delete Article
        </button>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Delete Article</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this article? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleDeleteCancel}
                  disabled={deleting}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditArticle;
