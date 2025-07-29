export async function getPosts() {
    return (await fetch(`${import.meta.env.BASE_URL}static/data/posts.json`)).json();
}