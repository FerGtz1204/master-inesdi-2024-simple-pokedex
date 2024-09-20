const BASE_API_URL = "https://marvelcdb.com/api/public/cards/";

export async function fetchCards() {
    const response = await fetch(BASE_API_URL);
    const data = await response.json();
    return data;
}