import axios from "axios";

export type ISO8601Date = string;
export type Id = number;
export type HealthCareDistrict =
  | "Etelä-Karjala"
  | "Etelä-Pohjanmaa"
  | "Etelä-Savo"
  | "HUS"
  | "Itä-Savo"
  | "Kainuu"
  | "Kanta-Häme"
  | "Keski-Pohjanmaa"
  | "Keski-Suomi"
  | "Kymenlaakso"
  | "Lappi"
  | "Länsi-Pohja"
  | "Pirkanmaa"
  | "Pohjois-Karjala"
  | "Pohjois-Pohjanmaa"
  | "Pohjois-Savo"
  | "Päijät-Häme"
  | "Satakunta"
  | "Vaasa"
  | "Varsinais-Suomi";
export type InfectionSource = Id | "unknown" | "related to earlier";
export type InfectionSourceCountry = string;

export type CoronaConfirmed = {
  id: Id;
  date: ISO8601Date;
  healthCareDistrict: HealthCareDistrict;
  infectionSource: InfectionSource;
  infectionSourceCountry: InfectionSourceCountry;
};

export type CoronaDeath = {
  id: Id;
  date: ISO8601Date;
  healthCareDistrict: HealthCareDistrict;
};

export type CoronaRecovered = {
  id: Id;
  date: ISO8601Date;
  healthCareDistrict: HealthCareDistrict;
};

export type CoronaCases = {
  confirmed: CoronaConfirmed[];
  deaths: CoronaDeath[];
  recovered: CoronaRecovered[];
};

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
