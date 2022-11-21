import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getPost } from "../../managers/PostManager"


export const PostDetails = () => {
    const { postId } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState({})
    const [postTags, setPostTags] = useState([])


    useEffect(
        () => {
            getPost(postId)
                .then((postObject) => {
                    setPost(postObject)
                })
        },
        [postId])

    return <div className="postBox">
        <div className="postTitle">{post?.title}</div>
        <img className="postImage" src={post?.image_url} alt=""></img>
        <Link to={`/users/${post?.author?.id}`} className="author">Author: {post?.user?.first_name} {post?.user?.last_name}</Link>
        <div className="postDate">Publication Date: {post?.publication_date} </div>
        <div className="postCategory"> Category: {post?.category?.label}</div>
        <div>Content: {post?.content} </div>
        <div>
            {
                post?.tags?.map(tag => <div className="tag">{tag.label}</div>)
            }
        </div>
        <button
            value={post.id}
            onClick={(clickEvent) => navigate(`/comments/${post.id}`)}
            className="comments-button"
        >View All Comments</button>
        <button
            value={postId}
            onClick={(clickEvent) => navigate(`/addComment/${post.id}`)}
            className="add-button"
        >Add Comment</button>

    </div>
}

//work on displaying tags selected