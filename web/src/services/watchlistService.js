const BASE_URL = '/api';

export async function getWatchlist(token){
    const response = await fetch(`${BASE_URL}/watchlist`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
        throw new Error('failed to fetch watchlist');
    }

    return response.json();
}

export async function addWatchlist(token, movie_id){
    const response = await fetch(`${BASE_URL}/watchlist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ movie_id })
    });

    if(!response.ok && response.status !== 409){
        throw new Error('failed to add to watchlist');
    }

    return response.json();
}

export async function removeWatchlist(token, movie_id){
    const response = await fetch(`${BASE_URL}/watchlist/${movie_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
        throw new Error('failed to remove watchlist');
    }

    return response.json();
}