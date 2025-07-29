export async function getPosts() {
    return (await fetch('/static/data/posts.json')).json();
}