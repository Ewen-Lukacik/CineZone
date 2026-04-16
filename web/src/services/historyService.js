const BASE_URL = "/api";

export async function getHistory(token) {
  const response = await fetch(`${BASE_URL}/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("failed to fetch history");
  }

  return response.json();
}

export async function addHistory(token, movie_id) {
  const response = await fetch(`${BASE_URL}/history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ movie_id }),
  });
  if (!response.ok) {
    throw new Error("failed to update history");
  }

  return response.json();
}
