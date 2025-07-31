
export async function getPosts(): Promise<any[]> {
    return (await fetch(`${import.meta.env.BASE_URL}static/data/posts.json`)).json();
}

export async function getPostsV2(): Promise<any[]> {

    return (await fetch(`${import.meta.env.BASE_URL}static/data/posts/manifest.json`)
        .then(res => res.json())
        .then(async (files) => {
            const allData = await Promise.all(
                files.map((path: string) =>
                    fetch(`${import.meta.env.BASE_URL}static/data/posts/${path}`)
                        .then(res => res.json().then(json => ({ ...json, id: path.replace('.json', '') })))
                        .catch(err => {
                            console.log(`Failed to fetch ${path}`, err);
                            return null;
                        })
                )
            );
            return allData.filter(Boolean)
        }));

}