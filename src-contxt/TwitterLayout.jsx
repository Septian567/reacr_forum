import React from 'react';
import { useState } from 'react';

const TwitterLayout = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [tweets, setTweets] = useState([
    {
      id: 1,
      author: 'React',
      username: '@reactjs',
      time: '2h',
      content: 'Just released React 18! Check out the new features...',
      likes: 2453,
      retweets: 892,
    },
    {
      id: 2,
      author: 'JavaScript',
      username: '@javascript',
      time: '5h',
      content:
        'The new ES2022 features are now available in all major browsers!',
      likes: 1892,
      retweets: 432,
    },
  ]);
  const [newTweet, setNewTweet] = useState('');

  const handleTweetSubmit = (e) => {
    e.preventDefault();
    if (newTweet.trim() === '') return;

    const tweet = {
      id: tweets.length + 1,
      author: 'You',
      username: '@yourusername',
      time: 'now',
      content: newTweet,
      likes: 0,
      retweets: 0,
    };

    setTweets([tweet, ...tweets]);
    setNewTweet('');
  };

  return (
    <div style={styles.container}>
      {/* Left Sidebar - Navigation */}
      <aside style={styles.leftSidebar}>
        <div style={styles.logo}>𝕏</div>
        <nav style={styles.nav}>
          {[
            'Home',
            'Explore',
            'Notifications',
            'Messages',
            'Bookmarks',
            'Lists',
            'Profile',
            'More',
          ].map((item) => (
            <div
              key={item}
              style={{
                ...styles.navItem,
                ...(activeTab === item && styles.activeNavItem),
              }}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </div>
          ))}
        </nav>
        <button style={styles.tweetButton}>Tweet</button>
      </aside>

      {/* Main Content - Scrollable */}
      <main style={styles.mainContent}>
        <div style={styles.header}>
          <h2 style={styles.headerTitle}>{activeTab}</h2>
        </div>

        {/* Tweet Composer */}
        <form onSubmit={handleTweetSubmit} style={styles.tweetComposer}>
          <div style={styles.avatar}></div>
          <input
            style={styles.tweetInput}
            placeholder="What's happening?"
            value={newTweet}
            onChange={(e) => setNewTweet(e.target.value)}
          />
          <button type="submit" style={styles.submitTweetButton}>
            Tweet
          </button>
        </form>

        {/* Tweet Feed */}
        <div style={styles.tweetFeed}>
          {tweets.map((tweet) => (
            <div key={tweet.id} style={styles.tweet}>
              <div style={styles.avatar}></div>
              <div style={styles.tweetContent}>
                <div style={styles.tweetHeader}>
                  <span style={styles.tweetAuthor}>{tweet.author}</span>
                  <span style={styles.tweetUsername}>{tweet.username}</span>
                  <span style={styles.tweetTime}>· {tweet.time}</span>
                </div>
                <div style={styles.tweetText}>{tweet.content}</div>
                <div style={styles.tweetActions}>
                  <span style={styles.tweetAction}>💬 23</span>
                  <span style={styles.tweetAction}>🔄 {tweet.retweets}</span>
                  <span style={styles.tweetAction}>❤️ {tweet.likes}</span>
                  <span style={styles.tweetAction}>📤</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Right Sidebar - Trends/Suggestions */}
      <aside style={styles.rightSidebar}>
        <div style={styles.searchBox}>
          <input style={styles.searchInput} placeholder="Search Twitter" />
        </div>

        <div style={styles.trendsSection}>
          <h3 style={styles.sectionTitle}>What's happening</h3>
          {[
            {
              category: 'Technology · Trending',
              name: '#TwitterClone',
              tweets: '10.2K',
            },
            {
              category: 'Web Development · Trending',
              name: 'React',
              tweets: '25.4K',
            },
            {
              category: 'Programming · Trending',
              name: 'JavaScript',
              tweets: '18.7K',
            },
          ].map((trend, index) => (
            <div key={index} style={styles.trendItem}>
              <div style={styles.trendCategory}>{trend.category}</div>
              <div style={styles.trendName}>{trend.name}</div>
              <div style={styles.trendCount}>{trend.tweets} Tweets</div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    backgroundColor: '#fff',
    color: '#0f1419',
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  leftSidebar: {
    width: '275px',
    height: '100vh',
    padding: '12px',
    borderRight: '1px solid #eff3f4',
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
  },
  logo: {
    fontSize: '32px',
    fontWeight: 'bold',
    padding: '12px',
    marginBottom: '16px',
    cursor: 'pointer',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  navItem: {
    padding: '12px',
    borderRadius: '24px',
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#f7f9f9',
    },
  },
  activeNavItem: {
    color: '#1d9bf0',
  },
  tweetButton: {
    backgroundColor: '#1d9bf0',
    color: 'white',
    border: 'none',
    borderRadius: '24px',
    padding: '16px',
    fontSize: '17px',
    fontWeight: 'bold',
    marginTop: '16px',
    cursor: 'pointer',
    width: '90%',
    ':hover': {
      backgroundColor: '#1a8cd8',
    },
  },
  mainContent: {
    flex: 1,
    maxWidth: '600px',
    height: '100vh',
    overflowY: 'auto',
    borderRight: '1px solid #eff3f4',
  },
  header: {
    padding: '16px',
    borderBottom: '1px solid #eff3f4',
    position: 'sticky',
    top: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(12px)',
    zIndex: 1,
  },
  headerTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 'bold',
  },
  tweetComposer: {
    padding: '16px',
    display: 'flex',
    gap: '12px',
    borderBottom: '1px solid #eff3f4',
    alignItems: 'center',
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#ddd',
    flexShrink: 0,
  },
  tweetInput: {
    flex: 1,
    border: 'none',
    fontSize: '20px',
    outline: 'none',
    padding: '12px 0',
    '::placeholder': {
      color: '#536471',
    },
  },
  submitTweetButton: {
    backgroundColor: '#1d9bf0',
    color: 'white',
    border: 'none',
    borderRadius: '24px',
    padding: '10px 16px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#1a8cd8',
    },
  },
  tweetFeed: {
    display: 'flex',
    flexDirection: 'column',
  },
  tweet: {
    padding: '16px',
    display: 'flex',
    gap: '12px',
    borderBottom: '1px solid #eff3f4',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#f7f9f9',
    },
  },
  tweetContent: {
    flex: 1,
  },
  tweetHeader: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
    marginBottom: '4px',
  },
  tweetAuthor: {
    fontWeight: 'bold',
  },
  tweetUsername: {
    color: '#536471',
  },
  tweetTime: {
    color: '#536471',
  },
  tweetText: {
    marginBottom: '12px',
    fontSize: '15px',
    lineHeight: '20px',
  },
  tweetActions: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '425px',
    color: '#536471',
  },
  tweetAction: {
    cursor: 'pointer',
    ':hover': {
      color: '#1d9bf0',
    },
  },
  rightSidebar: {
    width: '350px',
    height: '100vh',
    padding: '16px',
    position: 'sticky',
    top: 0,
  },
  searchBox: {
    backgroundColor: '#eff3f4',
    borderRadius: '24px',
    padding: '12px 16px',
    marginBottom: '16px',
  },
  searchInput: {
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    width: '100%',
    fontSize: '15px',
  },
  trendsSection: {
    backgroundColor: '#f7f9f9',
    borderRadius: '16px',
    overflow: 'hidden',
  },
  sectionTitle: {
    margin: 0,
    padding: '16px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  trendItem: {
    padding: '16px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#eaeaea',
    },
  },
  trendCategory: {
    fontSize: '13px',
    color: '#536471',
    marginBottom: '4px',
  },
  trendName: {
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  trendCount: {
    fontSize: '13px',
    color: '#536471',
  },
};

export default TwitterLayout;
