const API_KEY = 'b6f55242';

document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('searchTerm').value;
    if (!searchTerm) return;

    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(searchTerm)}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === 'False') {
            document.getElementById('movieDetails').innerHTML = '<p>Movie not found!</p>';
            return;
        }

        document.getElementById('movieDetails').innerHTML = `
            <h3>${data.Title} (${data.Year})</h3>
            <img src="${data.Poster}" alt="${data.Title} Poster">
            <p><strong>Genre:</strong> ${data.Genre}</p>
            <p><strong>Plot:</strong> ${data.Plot}</p>
            <p><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
        `;

        fetchSuggestions(data.Genre.split(',')[0].trim());
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
});

async function fetchSuggestions(genre) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(genre)}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === 'False') {
            document.getElementById('suggestionList').innerHTML = '<li>No suggestions available</li>';
            return;
        }

        const suggestions = data.Search;
        const suggestionList = suggestions.map(movie => `
            <li>
                <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">${movie.Title}</a>
            </li>
        `).join('');

        document.getElementById('suggestionList').innerHTML = suggestionList;
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
}

document.getElementById('subscribeBtn').addEventListener('click', function() {
    alert('Subscription feature is not functional in this demo.');
});



