import http from '../http-common';

const getUser = () => {
    return http.get("/Users");
};

 const createUser =  (data) => {
    return http.post('/Users', data);
};

const updateUser = (id, data) => {
    return http.put(`/Users/${id}`, data);
};

const deleteUser = (id) => {
    return http.delete(`/Users/${id}`);
};

const userService = {
    getUser,
    createUser,
    updateUser,
    deleteUser
};

export default userService;