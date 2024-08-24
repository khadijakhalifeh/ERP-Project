import http from '../http-common';

const getTag = () => {
    return http.get("/Tags");
};

 const createTag =  (data) => {
    return http.post('/Tags', data);
};

const updateTag = (data) => {
    return http.put(`/Tags`, data);
};

const deleteTag = (id) => {
    return http.delete(`/Tags`,{data : {id}});
};

const tagService = {
    getTag,
    createTag,
    updateTag,
    deleteTag
};

export default tagService;