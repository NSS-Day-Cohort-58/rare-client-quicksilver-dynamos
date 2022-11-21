import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { getPosts, searchPosts } from "../../managers/PostManager"
import { getCategories } from "../../managers/CategoryManager"




export const Posts = () => {

    const [allPosts, setAllPosts] = useState([])
    const [allCategories, setCategories] = useState([])
    const [selectedPosts, setSelectedPosts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState()
    const [searchTerms, updateSearchTerms] = useState("")
    

    useEffect(() => {
        getCategories().then(categoryData => setCategories(categoryData))
    }, [])
    
    useEffect(
        () => {
            getPosts()
                .then((allPostsArray) => {
                    setAllPosts(allPostsArray)
                })
        },
        [])
        
    useEffect(() => {
        setSelectedCategory(0)
    }, [])

    
    //state to hold all posts
    //state to hold filtered posts
    
    useEffect(
        () => {
            let selectedPostsArray = []
            if (selectedCategory !== 0) {
                allPosts.map(
                    (post) => {
                        if (selectedCategory === post.category.id) {
                            selectedPostsArray.push(post)
                        }
                    }
                    )
                    setSelectedPosts(selectedPostsArray)
            } else {
                setSelectedPosts(allPosts)
            }},
        [selectedCategory])

    useEffect(
        () => {
            let selectedPostsArray = []
            if (selectedCategory !== 0) {
                allPosts.map(
                    (post) => {
                        if (selectedCategory === post.category.id) {
                            selectedPostsArray.push(post)
                        }
                    }
                    )
                    setSelectedPosts(selectedPostsArray)
            } else {
                setSelectedPosts(allPosts)
            }},
        [allPosts])
            
    
    let handleCategoryChange = (e) => {
        setSelectedCategory(parseInt(e.target.value))
    }        

    const searchTitle = (search) => {
        searchPosts(search)
        .then((posts) => {
            setSelectedPosts(posts)
        })
        .catch(() => setSelectedPosts([]))

    }

    
//separate module for dropdown function
//export const Categories
//let html = <select id="category">
//html += <option value ="0">Search by Category</option>
//map through categories
//<option selected value="${category.id}">${category.name}</option>

    return <section>
        <h2>All Posts</h2>
        <div className="category">
            {/* Displaying the value of fruit */}
            
            <br />
                <label htmlFor="titleSearch">Search posts by title</label>
                <input name="titleSearch"
                    type={"text"}
                    placeholder="Search by Title"
                    onChange={(evt) => {
                        const searchTerm = evt.target.value
                        updateSearchTerms(searchTerm)
                    }}/>
                <button name="titleSearch" onClick={() => searchTitle(searchTerms)}>Search</button>
            <br />
            <select onChange={handleCategoryChange}> 
                <option value={0}>Search by Category</option>
                        {/* Mapping through each fruit object in our fruits array
                    and returning an option element with the appropriate attributes / values.
                    */}
                {allCategories.map((category) => <option value={category.id}>{category.label}</option>)}
            </select>
        </div>
        <div className="postsSection">
            <div>
                {   
                    selectedPosts.map((post) => {
                        return <li className="postBox">
                            <img className="postPic" src={post.image_url} width="600px" alt=""></img>
                            <Link className="postName" to={`/posts/${post.id}`}>{post?.title}</Link>
                            <div className="postInfo">
                                <p>Author: {post.author.full_name}</p>
                                <p>Category: {post.category.label}</p>
                            </div>
                        </li>
                    }
                    )
                }
            </div>
        </div>
    </section >
}