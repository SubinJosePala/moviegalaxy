// script.js

// Function to save ratings to localStorage
function saveRating(movieId, rating) {
    const ratings = JSON.parse(localStorage.getItem('movieRatings')) || {};
    ratings[movieId] = rating;
    localStorage.setItem('movieRatings', JSON.stringify(ratings));
  }
  
  // Function to load saved ratings
  function loadRatings() {
    const ratings = JSON.parse(localStorage.getItem('movieRatings')) || {};
    document.querySelectorAll('.movie-card').forEach(card => {
      const movieId = card.getAttribute('data-movie-id');
      const savedRating = ratings[movieId];
      if (savedRating) {
        const stars = card.querySelectorAll('.star');
        stars.forEach(star => {
          if (star.getAttribute('data-value') <= savedRating) {
            star.classList.add('active');
          }
        });
      }
    });
  }
  
  // Event listener for star rating
  document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function () {
      const movieCard = this.closest('.movie-card');
      const movieId = movieCard.getAttribute('data-movie-id');
      const rating = this.getAttribute('data-value');
  
      // Highlight the clicked stars
      const stars = movieCard.querySelectorAll('.star');
      stars.forEach(s => s.classList.remove('active'));
      this.classList.add('active');
      stars.forEach(s => {
        if (s.getAttribute('data-value') <= rating) {
          s.classList.add('active');
        }
      });
  
      // Save the rating
      saveRating(movieId, rating);
    });
  });
  
  // Load saved ratings on page load
  loadRatings();