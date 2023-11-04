import { atom } from "jotai";

const initialPayload = {
  language: "English",
  tokenLength: 1024,
  temperature: 0,
}

export const highlightsPayloadAtom = atom(initialPayload);