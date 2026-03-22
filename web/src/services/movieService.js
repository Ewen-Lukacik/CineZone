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