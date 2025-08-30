// Enhanced Category filtering with performance optimizations
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const postCards = document.querySelectorAll('.post-card');
  
  if (filterButtons.length === 0 || postCards.length === 0) return;

  // Cache DOM elements and create optimized filter system
  const postsGrid = document.querySelector('.posts-grid');
  let activeCategory = 'all';
  
  // Use DocumentFragment for efficient DOM manipulation
  const hiddenContainer = document.createElement('div');
  hiddenContainer.style.display = 'none';
  document.body.appendChild(hiddenContainer);

  // Debounce function for performance
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Optimized filter function using requestAnimationFrame
  function filterPosts(category) {
    if (activeCategory === category) return; // Avoid unnecessary work
    
    activeCategory = category;
    const visibleCards = [];
    const hiddenCards = [];
    
    // Batch DOM reads and writes
    requestAnimationFrame(() => {
      // Read phase - collect elements
      postCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          visibleCards.push(card);
        } else {
          hiddenCards.push(card);
        }
      });
      
      // Write phase - update DOM
      requestAnimationFrame(() => {
        // Hide cards first
        hiddenCards.forEach(card => {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
        });
        
        // Then show visible cards with staggered animation
        setTimeout(() => {
          hiddenCards.forEach(card => {
            card.style.display = 'none';
          });
          
          visibleCards.forEach((card, index) => {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, index * 50); // Staggered entrance
          });
        }, 200);
      });
    });
    
    updateActiveButton(category);
    debouncedUpdateCount(category, visibleCards.length);
  }

  // Efficient button state management
  function updateActiveButton(category) {
    filterButtons.forEach(btn => {
      const isActive = btn.getAttribute('data-category') === category;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
  }

  // Optimized post count update
  const debouncedUpdateCount = debounce((category, visibleCount) => {
    const totalPosts = postCards.length;
    
    let countDisplay = document.querySelector('.posts-count');
    if (!countDisplay) {
      countDisplay = document.createElement('div');
      countDisplay.className = 'posts-count';
      countDisplay.setAttribute('aria-live', 'polite');
      postsGrid.parentNode.insertBefore(countDisplay, postsGrid);
    }
    
    const message = category === 'all' 
      ? `Showing all ${totalPosts} posts`
      : `Showing ${visibleCount} posts in "${category}"`;
    
    countDisplay.textContent = message;
  }, 100);

  // Add optimized event listeners with passive option
  filterButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const category = this.getAttribute('data-category');
      filterPosts(category);
    }, { passive: true });
    
    // Add keyboard support
    button.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const category = this.getAttribute('data-category');
        filterPosts(category);
      }
    });
  });

  // Initialize with smooth entrance animation
  requestAnimationFrame(() => {
    postCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  });
  
  // Performance: Use Intersection Observer for lazy loading if many posts
  if (postCards.length > 12) {
    const observerOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    postCards.forEach(card => {
      observer.observe(card);
    });
  }
});

// Optimized CSS injection (only if not already present)
if (!document.querySelector('#filter-optimization-css')) {
  const style = document.createElement('style');
  style.id = 'filter-optimization-css';
  style.textContent = `
    .posts-count {
      color: rgba(245, 232, 199, 0.8);
      font-style: italic;
      margin: 1.5em 0;
      text-align: center;
      font-family: 'Open Sans', sans-serif;
      font-size: 1rem;
      opacity: 0.9;
    }

    .post-card {
      transition: 
        opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .post-card.in-view {
      opacity: 1;
      transform: translateY(0);
    }

    @media (prefers-reduced-motion: reduce) {
      .post-card {
        transition: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}
