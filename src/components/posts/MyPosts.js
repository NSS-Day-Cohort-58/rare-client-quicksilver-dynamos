import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getMyPosts, getPosts } from "../../managers/PostManager"





export const MyPosts = () => {
    const [myPosts, setMyPosts] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getMyPosts()
                .then((allPostsArray) => {
                    setMyPosts(allPostsArray)
                })
        },
        [])


    const deletePost = (evt) => {

        return fetch(`http://localhost:8000/posts/${evt.target.value}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`

            }
        })
            .then(() => {
                fetch(`http://localhost:8000/posts?mine`,
                {
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("auth_token")}`
                    }
                })
                    .then(response => response.json())
                    .then((postArray) => {
                        setMyPosts(postArray)
                    })

            })
    }


    const toDeleteOrNot = (evt) => {
        if (window.confirm("Are you sure you want to delete?\n Either Ok or Cancel.") == true) {
            deletePost(evt);
        } else {
            navigate(`/my_posts`);
        }
    }

    const localUser = localStorage.getItem("auth_token")
    // const userObject = JSON.parse(localUser)

    // const myPosts = allPosts.filter(post => userObject === post.user_id)


    if (myPosts.length === 0) {
        return <div>You have no posts created yet!</div>
    }
    else {
        return <section>
        <h2>My Posts</h2>
        <div className = "postsSection">
            {
                myPosts.map(
                    (post) => {
                        return <li className="postBox">
                        <img className="postPic" src={post.image_url} width="600px" alt=""></img>
                        <Link className="postName" to={`/posts/${post.id}`}>{post?.title}</Link>
                        <div className="postInfo">
                            <p>Author: {post.author.full_name}</p>
                            <p>Category: {post.category.label}</p>
                        </div>
                        <button id={post.id}
                        onClick = {
                            (evt) => {
                                let postId = evt.target.id
                                navigate(`/edit_post/${postId}`)
                            }
                        }>Edit</button>
                        <button value={post.id} className="delete-button" onClick={(clickEvent) => toDeleteOrNot(clickEvent)}
                        >Delete</button>
                    </li>   
                    }
                )
            }
        </div>
    </section>
    }
}