// Category filtering functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const postCards = document.querySelectorAll('.post-card');
  
  if (filterButtons.length === 0 || postCards.length === 0) return;

  // Filter posts by category
  function filterPosts(category) {
    postCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'block';
        // Add fade in animation
        card.style.opacity = '0';
        setTimeout(() => {
          card.style.opacity = '1';
        }, 100);
      } else {
        card.style.display = 'none';
      }
    });
    
    // Update active button
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
    });
    
    const activeButton = document.querySelector(`[data-category="${category}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
    }
    
    // Show count of visible posts
    updatePostCount(category);
  }

  // Update post count display
  function updatePostCount(category) {
    const visiblePosts = document.querySelectorAll('.post-card[style*="display: block"], .post-card:not([style])').length;
    const totalPosts = postCards.length;
    
    // Find or create count display
    let countDisplay = document.querySelector('.posts-count');
    if (!countDisplay) {
      countDisplay = document.createElement('div');
      countDisplay.className = 'posts-count';
      const postsGrid = document.querySelector('.posts-grid');
      if (postsGrid) {
        postsGrid.parentNode.insertBefore(countDisplay, postsGrid);
      }
    }
    
    if (category === 'all') {
      countDisplay.textContent = `Showing all ${totalPosts} posts`;
    } else {
      countDisplay.textContent = `Showing ${visiblePosts} posts in "${category}"`;
    }
  }

  // Add click event listeners to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      filterPosts(category);
    });
  });

  // Initialize with all posts visible
  filterPosts('all');
  
  // Add smooth transitions
  postCards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });
});

// Add CSS for filtering with cosmic theme
const filterCSS = `
.posts-count {
  color: rgba(245, 232, 199, 0.8);
  font-style: italic;
  margin: 1em 0;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
}

.post-card {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.filter-btn {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.filter-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.2), transparent);
  transition: left 0.5s;
}

.filter-btn:hover::before,
.filter-btn.active::before {
  left: 100%;
}

@media (max-width: 768px) {
  .category-filter {
    justify-content: center;
  }
  
  .filter-btn {
    font-size: 0.9em;
    padding: 6px 12px;
  }
  
  .posts-count {
    font-size: 0.9em;
  }
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = filterCSS;
document.head.appendChild(style);
