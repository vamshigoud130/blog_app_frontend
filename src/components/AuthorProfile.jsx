import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { authStore } from "../store/authStore";
import {
  pageWrapper,
  cardClass,
  headingClass,
  bodyText,
  section,
  divider,
  loadingClass,
  emptyStateClass,
  articleGrid
} from '../styles/common';
import ArticleCard from './ArticleCard';

function AuthorProfile() {
  const { currentUser } = authStore();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchMyArticles = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:4000/author-api/articles/${currentUser._id}`, {
          withCredentials: true
        });
        setArticles(res.data.payload || []);
      } catch (err) {
        console.error('Error fetching author articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyArticles();
  }, [currentUser]);

  if (!currentUser) return null;

  return (
    <div className={pageWrapper}>
      {/* Author Info Section */}
      <div className={section}>
        <div className={cardClass}>
          <div className="flex flex-col gap-1 mb-6">
            <h1 className={headingClass}>{currentUser.firstName} {currentUser.lastName}</h1>
            <p className={bodyText}>{currentUser.email}</p>
          </div>

          <div className="flex gap-4">
            <div className="bg-gray-100 px-3 py-1.5 rounded border border-gray-200">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">Role</span>
              <span className="text-sm font-medium text-gray-900 border-none">{currentUser.role}</span>
            </div>
            <div className="bg-green-50 px-3 py-1.5 rounded border border-green-200">
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider block mb-0.5">Status</span>
              <span className="text-sm font-medium text-green-700">Active Author</span>
            </div>
          </div>
        </div>
      </div>

      <div className={divider}></div>

      {/* Author's Articles Section */}
      <section className={section}>
        <h2 className={`${headingClass} mb-6`}>My Articles</h2>

        {loading ? (
          <div className={loadingClass}>Loading your articles...</div>
        ) : articles.length === 0 ? (
          <div className={emptyStateClass}>You haven't published any articles yet.</div>
        ) : (
          <div className={articleGrid}>
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default AuthorProfile;