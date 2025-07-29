export async function getTags() {
    return (await fetch(`${import.meta.env.BASE_URL}static/data/tags.json`)).json();
}