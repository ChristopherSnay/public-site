export async function getTags() {
    return (await fetch('/static/data/tags.json')).json();
}