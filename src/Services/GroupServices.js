import axios from 'axios';
const baseAPI = 'https://secret-springs-96490.herokuapp.com'

export const GroupService = {
    getGroups: () => {
        return axios.get(baseAPI+'/contactgroups');
    },
    getGroupById: (id) => {
        return axios.get(baseAPI+`/contactgroups/${id}`);
    },
    deleteGroupById: (id) => {
        return axios.delete(baseAPI+`/contactgroups/${id}`);
    },
    createGroup: (data) => {
        return axios.post(baseAPI+'/contactgroups', data);
    },
    updateGroup: (data) => {
        return axios.put(baseAPI+`/contactgroups/${data.id}`, data);
    }
}