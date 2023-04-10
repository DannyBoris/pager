import axios, { AxiosError } from "axios";

const net = axios.create({ baseURL: "https://pager-api.onrender.com" });

export async function api(
  path: string,
  method: "get" | "post",
  data?: any,
  options?: any
) {
  try {
    const res = await net[method](path, data, options);
    return res.data;
  } catch (err: any) {
    return err;
  }
}
