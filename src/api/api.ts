const BACKEND_URL = "http://0.0.0.0:8080"

export async function createWord(word: string, synonyms: string[]): Promise<Response> {
    console.log(BACKEND_URL);
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
            word: word,
            synonyms: synonyms
        }),
        mode: "cors"
    })
}

export async function getSynonyms(word: string): Promise<string[]> {
    return fetch(`${BACKEND_URL}/synonyms/${word}`, {
            method: "GET",
            mode: "cors"
        })
            .then(response => {
                if (!response.ok) {
                    return [];
                }
                return response.json();
            });
}

export async function getWords(): Promise<string[]> {
    return fetch(`${BACKEND_URL}/words`, {
        method: "GET",
        mode: "cors"
    })
        .then(response => {
            if (!response.ok) {
                return [];
            }
            return response.json();
        });
}