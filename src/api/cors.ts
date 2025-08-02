const CORS_URL = "http://localhost:8080"

export async function fetchBypassingCORS(url: string) {
    const response = await fetch(CORS_URL + "/" + url)
    return response;
}