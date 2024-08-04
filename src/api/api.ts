import {SynonymsResponse} from "../data/SynonymsResponse.ts";

const BACKEND_URL = "http://localhost:8080"

export async function createWord(word: string): Promise<Response> {
    return await fetch(`${BACKEND_URL}/word`, {
        method: "POST",
        body: JSON.stringify({
            word: word,
        }),
        mode: "cors"
    })
}

export async function addSynonym(word: string, synonym: string): Promise<Response> {
    return await fetch(`${BACKEND_URL}/synonym/${word}`, {
        method: "POST",
        body: JSON.stringify({
            synonym: synonym
        }),
        mode: "cors"
    })
}

export async function getSynonyms(word: string): Promise<SynonymsResponse> {
    return getAndSerialize<SynonymsResponse>(`${BACKEND_URL}/synonyms/${word}`);
}

async function getAndSerialize<T>(url: string): Promise<T> {
    return fetch(url, {
        method: "GET",
        mode: "cors"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(json => json as T);
}
