const BASE_URL = '/api';

export async function getRating(token, movieId){
    const response = await fetch(`${BASE_URL}/ratings/movie/${movieId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
        throw new Error('failed to fetch ratings');
    }
    return response.json();
}

export async function insertRating(token, movieId, rating){
    const response = await fetch(`${BASE_URL}/ratings/ratings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ movie_id: movieId, rating })
    });

    if(!response.ok){
        throw new Error('failed to save rating');
    }
    return response.json();
}


export async function deleteRating(token, movieId){
    const response = await fetch(`${BASE_URL}/ratings/${movieId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
        throw new Error('failed to delete ratings');
    }
    return response.json();
}


export async function getSuggestions(token){
    const response = await fetch(`${BASE_URL}/ratings/suggestions`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
        throw new Error('failed to fetch suggestions');
    }
    return response.json();
}