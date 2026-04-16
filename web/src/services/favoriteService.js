const BASE_URL = '/api';

export async function getFavorites(token){
    const response = await fetch(`${BASE_URL}/favorites`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
        throw new Error('failed to fetch favorites');
    }

    return response.json();
}

export async function addFavorites(token, movie_id){
    const response = await fetch(`${BASE_URL}/favorites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ movie_id })
    });

    if(!response.ok && response.status !== 409){
        throw new Error('failed to add to favories');
    }

    return response.json();
}

export async function removeFavorites(token, movie_id){
    const response = await fetch(`${BASE_URL}/favorites/${movie_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
        throw new Error('failed to remove favories');
    }

    return response.json();
}