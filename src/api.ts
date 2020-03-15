import axios from "axios";
import { CoronaCases } from "./types";

export async function getCoronaCases() {
  const t1 = Date.now();
  console.info("Fetching new corona cases...");
  const response = await axios.get<CoronaCases>(
    "https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData"
  );
  const t2 = Date.now();
  console.info(`..finished. Took ${t2 - t1}ms`);
  return response.data;
}
