import axios from "axios";

const instance = axios.create({
  baseURL: "https://96318a87-0588-4da5-9843-b3d7919f1782.mock.pstmn.io",
  headers: { "Content-Type": "application/json" },
});

export default instance;