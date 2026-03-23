const BASE_URL = '/api';

export async function getMovies({limit = 25, min_rating, category} = {}){
    /**CONSTRUCTION DE LURL */
    const params = new URLSearchParams();
    params.append('limit', limit);

    //params optionnels
    if(min_rating){
        params.append('min_rating', min_rating);
    }

    if(category){
        params.append('category', category);
    }

    //piocher les films via l'api
    const response = await fetch(`${BASE_URL}/movies?${params.toString()}`);
    if(!response.ok){
        throw new Error('Failed to fetch movies');
    }
    return response.json();
}

export async function createMovie(token, movieData) {
    const response = await fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(movieData)
    });

    if (!response.ok) throw new Error('Failed to create movie');
    return response.json();
}

export async function updateMovie(token, id, movieData) {
    const response = await fetch(`${BASE_URL}/movies/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(movieData)
    });

    if (!response.ok) throw new Error('Failed to update movie');
    return response.json();
}

export async function deleteMovie(token, id) {
    const response = await fetch(`${BASE_URL}/movies/${id}?role=admin`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) throw new Error('Failed to delete movie');
    return response.json();
}