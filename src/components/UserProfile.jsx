import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { authStore } from '../store/authStore';
import {
  pageWrapper,
  cardClass,
  headingClass,
  bodyText,
  section,
  divider,
  loadingClass,
  emptyStateClass,
  subHeadingClass,
  articleGrid
} from '../styles/common';
import ArticleCard from './ArticleCard';

function UserProfile() {
  const { currentUser } = authStore();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:4000/user-api/read-articles', { withCredentials: true });
        setArticles(res.data.payload || []);
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (!currentUser) return null;

  return (
    <div className={pageWrapper}>
      {/* Profile Info Card */}
      <div className={section}>
        <div className={cardClass}>
          <div className="flex flex-col gap-1 mb-6">
            <h1 className={headingClass}>{currentUser.firstName} {currentUser.lastName}</h1>
            <p className={bodyText}>{currentUser.email}</p>
          </div>

          <div className="flex gap-4">
            <div className="bg-gray-100 px-3 py-1.5 rounded border border-gray-200">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">Role</span>
              <span className="text-sm font-medium text-gray-900">{currentUser.role}</span>
            </div>
            <div className="bg-green-50 px-3 py-1.5 rounded border border-green-200">
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider block mb-0.5">Status</span>
              <span className="text-sm font-medium text-green-700">Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className={divider}></div>

      {/* Suggested Articles Section */}
      <section className={section}>
        <h2 className={`${headingClass} mb-6`}>Browse Articles</h2>

        {loading ? (
          <div className={loadingClass}>Loading articles...</div>
        ) : articles.length === 0 ? (
          <div className={emptyStateClass}>No articles available yet.</div>
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

export default UserProfile;



//read articles of all authors
//display them in the form of grid of cards
// 1.card for extra small
// 2.cards for small
// 3.cards for medium
// 4.cards for large screen onwards