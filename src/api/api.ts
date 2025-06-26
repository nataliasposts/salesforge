import axios from "axios";
import type { SequencePayload } from "../features/types";

const client = axios.create({
  baseURL: "https://api.salesforge.ai",
  headers: { "Content-Type": "application/json" },
});

export const postSequence = async (data: SequencePayload) => {
  return client.post("/sequences", data);
};
