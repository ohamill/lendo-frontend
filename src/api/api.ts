import {WordsResponse} from "../data/WordsResponse.ts";
import {SynonymsResponse} from "../data/SynonymsResponse.ts";

const BACKEND_URL = "http://localhost:8080"

export async function createWord(word: string, synonyms: string[]): Promise<Response> {
    return await fetch(`${BACKEND_URL}/word`, {
        method: "POST",
        body: JSON.stringify({
            word: word,
            synonyms: synonyms
        }),
        mode: "cors"
    })
}

export async function addSynonyms(word: string, synonyms: string[]): Promise<Response> {
    return await fetch(`${BACKEND_URL}/synonyms/${word}`, {
        method: "POST",
        body: JSON.stringify({
            synonyms: synonyms
        }),
        mode: "cors"
    })
}

export async function getSynonyms(word: string): Promise<SynonymsResponse> {
    return getAndSerialize<SynonymsResponse>(`${BACKEND_URL}/synonyms/${word}`);
}

export async function getWords(): Promise<WordsResponse> {
    return getAndSerialize<WordsResponse>(`${BACKEND_URL}/words`);
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
