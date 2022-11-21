

export const getPosts = () => { 
    return fetch(`http://localhost:8000/posts`, {
        method: "GET",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const getSubscribedPosts = () => { 
    return fetch(`http://localhost:8000/posts?subscribed`, {
        method: "GET",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const getPost = (postId) => { 
    return fetch(`http://localhost:8000/posts/${postId}`, {
        method: "GET",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const getMyPosts = () => { 
    return fetch(`http://localhost:8000/posts?mine`, {
        method: "GET",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const searchPosts = (search) => { 
    return fetch(`http://localhost:8000/posts?search=${search}`, {
        method: "GET",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}