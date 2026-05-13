import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { pageWrapper, inputClass, submitBtn, loadingClass, emptyStateClass, articleTitle, articleBody, articleMeta, tagClass, ghostBtn, secondaryBtn } from '../styles/common';
import { authStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  
  const { isAuthenticated, currentUser } = authStore();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const getCommentDate = (commentId) => {
    if (!commentId) return "";
    const timestamp = parseInt(commentId.substring(0, 8), 16) * 1000;
    return new Date(timestamp).toLocaleString(undefined, { 
      year: 'numeric', month: 'short', day: 'numeric', 
      hour: '2-digit', minute: '2-digit' 
    });
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://blog-app-backend-1-5vj1.onrender.com/user-api/article/${id}`, {
          withCredentials: true,
        });
        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load article.');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const onCommentSubmit = async (data) => {
    try {
      const res = await axios.put('https://blog-app-backend-1-5vj1.onrender.com/user-api/articles', {
        articleId: id,
        comment: data.comment
      }, { withCredentials: true });
      
      if (res.status === 200) {
        toast.success("Comment added!");
        reset();
        setArticle(res.data.payload);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add comment');
    }
  };

  const handleEditClick = (comment) => {
    setEditingCommentId(comment._id);
    setEditCommentText(comment.comment);
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditCommentText("");
  };
  
  const saveEdit = async (commentId) => {
    if (!editCommentText.trim()) return;
    try {
      const res = await axios.put('https://blog-app-backend-1-5vj1.onrender.com/user-api/articles/comment', {
        articleId: id,
        commentId,
        comment: editCommentText
      }, { withCredentials: true });
      if (res.status === 200) {
        toast.success("Comment updated!");
        setArticle(res.data.payload);
        cancelEdit();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update comment');
    }
  };

  const deleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      const res = await axios.delete(`https://blog-app-backend-1-5vj1.onrender.com/user-api/articles/comment/${id}/${commentId}`, {
        withCredentials: true
      });
      if (res.status === 200) {
        toast.success("Comment deleted!");
        setArticle(res.data.payload);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete comment');
    }
  };

  if (loading) {
    return (
      <div className={pageWrapper}>
        <div className={loadingClass}>Loading article...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={pageWrapper}>
        <div className={emptyStateClass}>
          <p className="text-red-500 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className={secondaryBtn}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!article) return null;

  const { title, content, author, category, updatedAt, comments = [] } = article;

  return (
    <div className={pageWrapper}>
      <div className="max-w-3xl mx-auto bg-surface-container-low rounded-3xl p-8 md:p-12 shadow-[0_20px_40px_rgba(25,28,29,0.05)]">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className={`${ghostBtn} mb-12 inline-flex items-center gap-2`}
        >
          ← Back to Articles
        </button>

        {/* Category tag */}
        {category && (
          <div className="mb-6">
            <span className={tagClass}>
              {category}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className={`${articleTitle} text-4xl md:text-5xl mb-6`}>{title}</h1>

        {/* Meta */}
        <div className={`${articleMeta} mb-12 pb-8 border-b border-outline-variant/15`}>
          By{' '}
          <span className="font-semibold text-on-surface">
            {author?.firstName} {author?.lastName}
          </span>{' '}
          <span className="opacity-50 mx-2">•</span> {new Date(updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>

        {/* Content */}
        <div className={articleBody}>
          {content}
        </div>

        {/* Comments Section */}
        <div className="mt-10 border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Comments ({comments.length})
          </h2>

          {isAuthenticated ? (
            <form onSubmit={handleSubmit(onCommentSubmit)} className="mb-8">
              <textarea
                className={`${inputClass} w-full resize-none`}
                rows="3"
                placeholder="Write a comment..."
                {...register('comment', { required: 'Comment cannot be empty' })}
              ></textarea>
              {errors.comment && <p className="text-red-500 text-xs mt-1">{errors.comment.message}</p>}
              <div className="flex justify-end">
                <button className={`${submitBtn} mt-2 w-auto px-6 py-2 text-sm`} type="submit">
                  Post Comment
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-gray-50 text-gray-600 text-sm py-4 px-6 rounded-lg mb-8 border text-center">
              Please <button onClick={() => navigate('/login')} className="text-blue-600 font-semibold hover:underline">sign in</button> to leave a comment.
            </div>
          )}

          {comments.length > 0 ? (
            <ul className="space-y-6">
              {comments.map((c) => (
                <li key={c._id} className="bg-gray-50 border rounded-lg px-5 py-4">
                  <div className="flex justify-between items-start mb-3 border-b border-gray-200 pb-2">
                    <div className="flex items-center gap-3">
                      {c.user?.profileImageURL ? (
                        <img src={c.user.profileImageURL} alt="Profile" className="w-8 h-8 rounded-full object-cover border" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                          {c.user?.firstName?.charAt(0).toUpperCase() || '?'}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {c.user?.firstName} {c.user?.lastName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {getCommentDate(c._id)}
                        </p>
                      </div>
                    </div>
                    {currentUser && currentUser._id === c.user?._id && editingCommentId !== c._id && (
                      <div className="flex gap-2">
                        <button onClick={() => handleEditClick(c)} className="text-xs text-blue-600 hover:underline">Edit</button>
                        <button onClick={() => deleteComment(c._id)} className="text-xs text-red-600 hover:underline">Delete</button>
                      </div>
                    )}
                  </div>
                  
                  {editingCommentId === c._id ? (
                    <div>
                      <textarea
                        className={`${inputClass} w-full resize-none text-sm`}
                        rows="2"
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                      ></textarea>
                      <div className="flex justify-end gap-2 mt-2">
                        <button onClick={cancelEdit} className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                        <button onClick={() => saveEdit(c._id)} className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{c.comment}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm italic text-center py-4">No comments yet. Be the first to start the conversation!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;
