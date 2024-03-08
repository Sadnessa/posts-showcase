import axios from "axios";

export const getPosts = async () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/posts/")
    .then((data) => data.data)
    .catch((error) => console.log(error));
};

export const getUsers = async () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/users/")
    .then((data) => data.data)
    .catch((error) => console.log(error));
};
