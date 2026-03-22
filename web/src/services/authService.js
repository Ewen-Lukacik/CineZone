const BASE_URL = '/api';

export async function loginUser({ email, password}){
    const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password})
    });

    if(!response.ok){
        throw new Error('Wrong credentials');
    }

    return response.json();
}

export async function registerUser({ name, email, password }){
    const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password})
    })

    if(!response.ok){
        throw new Error('Registration failed');
    }

    return response.json();
}