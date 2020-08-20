import { getToken } from "../util/auth";

const login = async (parent, { username, password }) => ({
  token: await getToken({ username, password }),
});

export default login;
