const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function getMoviePoster(title, year){
    const response = await fetch(
        `${TMDB_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}&year=${year}`
    );

    if(!response.ok){
        throw new Error('TMDB fetch failed');
    }

    const data = await response.json();
    const movie = data.results[0];

    if(!movie || !movie.poster_path){
        return null;
    }

    return `${TMDB_IMAGE_URL}${movie.poster_path}`;
}