// Search functionality using Lunr.js
document.addEventListener('DOMContentLoaded', function() {
  // Only run if we're on a page with search
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  if (!searchInput || !searchResults) return;

  let searchIndex;
  let searchDocuments = {};

  // Build search index from posts
  function buildSearchIndex() {
    // Get all post data from the page
    const posts = [];
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach((card, idx) => {
      const titleEl = card.querySelector('h2 a');
      const excerptEl = card.querySelector('.post-excerpt');
      const categoryEl = card.querySelector('.post-category');
      
      if (titleEl && excerptEl) {
        const post = {
          id: idx,
          title: titleEl.textContent,
          excerpt: excerptEl.textContent,
          category: categoryEl ? categoryEl.textContent : '',
          url: titleEl.href
        };
        posts.push(post);
        searchDocuments[idx] = post;
      }
    });

    // Create Lunr index if Lunr is available
    if (typeof lunr !== 'undefined') {
      searchIndex = lunr(function() {
        this.ref('id');
        this.field('title', { boost: 10 });
        this.field('excerpt');
        this.field('category', { boost: 5 });

        posts.forEach(post => {
          this.add(post);
        });
      });
    }
  }

  // Perform search
  function performSearch(query) {
    if (!query.trim()) {
      searchResults.innerHTML = '';
      return;
    }

    if (searchIndex) {
      // Use Lunr for advanced search
      const results = searchIndex.search(query);
      displaySearchResults(results.map(result => searchDocuments[result.ref]));
    } else {
      // Fallback to simple text search
      const posts = Object.values(searchDocuments);
      const results = posts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.category.toLowerCase().includes(query.toLowerCase())
      );
      displaySearchResults(results);
    }
  }

  // Display search results
  function displaySearchResults(results) {
    if (results.length === 0) {
      searchResults.innerHTML = '<p>No posts found matching your search.</p>';
      return;
    }

    const resultsHTML = results.map(post => `
      <div class="search-result">
        <h3><a href="${post.url}">${post.title}</a></h3>
        <p class="search-meta">${post.category}</p>
        <p>${post.excerpt.substring(0, 150)}...</p>
      </div>
    `).join('');

    searchResults.innerHTML = `
      <div class="search-results-container">
        <h3>Search Results (${results.length})</h3>
        ${resultsHTML}
      </div>
    `;
  }

  // Initialize search
  buildSearchIndex();

  // Search on input
  let searchTimeout;
  searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      performSearch(this.value);
    }, 300);
  });

  // Clear search results when input is cleared
  searchInput.addEventListener('blur', function() {
    if (!this.value.trim()) {
      setTimeout(() => {
        searchResults.innerHTML = '';
      }, 200);
    }
  });
});

// Add CSS for search results
const searchCSS = `
.search-results-container {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 1em;
  margin-top: 1em;
  max-height: 400px;
  overflow-y: auto;
}

.search-result {
  border-bottom: 1px solid #eee;
  padding: 1em 0;
}

.search-result:last-child {
  border-bottom: none;
}

.search-result h3 {
  margin: 0 0 0.5em 0;
  font-size: 1.2em;
}

.search-meta {
  color: #666;
  font-size: 0.9em;
  margin: 0 0 0.5em 0;
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = searchCSS;
document.head.appendChild(style);
