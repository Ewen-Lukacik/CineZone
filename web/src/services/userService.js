const BASE_URL = '/api';

export async function getMe(token){
    const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
        throw new Error('Failed to fetch profile');
    }

    return response.json();
}