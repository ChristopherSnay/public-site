import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DynamicFieldGroup from "../components/DynamicFormGroup";
import DynamicObjectFieldGroup from "../components/DynamicObjectFormGroup";
import usePosts from "../hooks/usePosts";
import type { Post } from "../models/Post";
import type { PostBlock } from "../models/PostBlock";
import { getPostsV2 } from "../services/postService";

export default function DevPage() {
    const [tagFields, setTagFields] = useState([""]);
    const [blockFields, setBlockFields] = useState<PostBlock[]>([]);
    const [postTitle, setPostTitle] = useState<string>('');
    const [postDate, setPostDate] = useState<string>(new Date().toLocaleDateString());
    const [featuredImage, setFeaturedImage] = useState<string>('');
    const { posts, refreshPosts } = usePosts();

    // const handleSubmitClick = () => {
    //     const post: Post = {
    //         id: Math.max(...posts.map(x => x.id)) + 1,
    //         title: postTitle,
    //         date: postDate,
    //         image: featuredImage,
    //         blocks: blockFields,
    //         tags: tagFields
    //     }

    //     console.debug(post)
    // }

    const handleSubmitClick = () => {
        console.debug(posts);
        const post: Post = {
            id: Math.max(...posts.map(x => x.id)) + 1,
            title: postTitle,
            date: postDate,
            image: featuredImage,
            blocks: blockFields,
            tags: tagFields
        };

        const json = JSON.stringify(post, null, 2); // pretty-print for readability
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${post.id}.json`; // filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url); // cleanup
        refreshPosts();
        console.debug('Downloaded:', post);
    };

    useEffect(() => {
        console.debug('ok');
        getPostsV2().then(response => console.debug(response));
    }, []);

    return (
        <section className="container">
            <div className="row g-4 m-0">
                <div className="col-12 col-md-6">
                    <TextField fullWidth label="Post Title"
                        value={postTitle} onChange={e => setPostTitle(e.target.value)} />
                </div>
                <div className="col-12 col-md-6">
                    <TextField fullWidth label="Featured Image"
                        value={featuredImage} onChange={e => setFeaturedImage(e.target.value)} />
                </div>
                <div className="col-12 col-md-6">
                    <TextField fullWidth label="Date Posted"
                        value={postDate} onChange={e => setPostDate(e.target.value)} />
                </div>
                <div className="col-12 col-md-6">
                    <DynamicObjectFieldGroup label="Blocks" values={blockFields}
                        onChange={setBlockFields} />
                </div>
                <div className="col-12 col-md-6">
                    <DynamicFieldGroup label="Tags" values={tagFields}
                        onChange={setTagFields} />
                </div>
            </div>
            <Button variant="contained" onClick={handleSubmitClick}>Submit</Button>
        </section >
    )
}