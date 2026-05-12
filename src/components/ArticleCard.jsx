import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  articleCardClass,
  articleTitle,
  articleExcerpt,
  articleMeta,
  tagClass,
  timestampClass,
  primaryBtn,
  secondaryBtn
} from '../styles/common';
import { authStore } from '../store/authStore';

function ArticleCard({ article }) {
  const navigate = useNavigate();
  const { title, content, author, category, updatedAt } = article;
  const { currentUser } = authStore();
  const date = new Date(updatedAt).toLocaleDateString();

  return (
    <div className={articleCardClass}>
      <div className="flex justify-between items-start mb-2">
        <span className={tagClass}>{category}</span>
        <span className={timestampClass}>{date}</span>
      </div>
      
      <h3 className={articleTitle}>{title}</h3>
      <p className={articleExcerpt}>{content}</p>
      
      <div className="mt-4 pt-4 border-t border-outline-variant/15">
        <div className={articleMeta}>
          By <span className="font-semibold text-on-surface">{author?.firstName} {author?.lastName}</span>
          <p className="text-xs text-on-surface-variant/70 mt-1">Updated: {new Date(article.updatedAt).toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          <button 
            className={`${primaryBtn} mt-4 w-full`} 
            onClick={() => navigate(`/article/${article._id}`)}
          >
            Read More
          </button>
      {/*if author then we can update the article*/}
      {currentUser?.role === 'AUTHOR' && (
        <button 
          className={`${secondaryBtn} mt-2 w-full`} 
          onClick={() => navigate(`/edit-article/${article._id}`)}
        >
          Update Article
        </button>
      )}
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
