import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
  pageWrapper,
  pageTitleClass,
  subHeadingClass,
  mutedText,
  section,
  loadingClass,
  emptyStateClass,
  articleGrid
} from '../styles/common';
import ArticleCard from './ArticleCard';
import { authStore } from '../store/authStore';

function Home() {
  const { isAuthenticated, currentUser } = authStore();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:4000/user-api/read-articles', { withCredentials: true });
        setArticles(res.data.payload || []);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles. Please sign in again.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);
  const greeting = isAuthenticated && currentUser 
    ? `Hello, ${currentUser.firstName}!` 
    : 'Welcome to our Blog';

  return (
    <div className={pageWrapper}>
      <header className={section}>
        <h1 className={pageTitleClass}>{greeting}</h1>
      </header>

      {loading ? (
        <div className={loadingClass}>Loading latest articles...</div>
      ) : error ? (
        <div className={emptyStateClass}>{error}</div>
      ) : articles.length === 0 ? (
        <div className={emptyStateClass}>No articles found. Check back later!</div>
      ) : (
        <div className={articleGrid}>
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

//read articles of all authors
//display them in the form of grid of cards
// 1.card for extra small
// 2.cards for small
// 3.cards for medium
// 4.cards for large screen onwards