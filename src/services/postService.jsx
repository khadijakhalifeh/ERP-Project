import http from '../http-common';

const getPost = () => {
    return http.get("/Posts");
};

 const createPost =  (data) => {
    return http.post('/Posts', data);
};

const updatePost = (data) => {
    return http.put(`/Posts`, data);
};

const deletePost = (id) => {
    return http.delete(`/Posts`,{data : {id}});
};

const postService = {
    getPost,
    createPost,
    updatePost,
    deletePost
};

export default postService;