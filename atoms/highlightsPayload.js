import { atom } from "jotai";

const initialPayload = {
  language: "English",
  tokenLength: 1024
}

export const highlightsPayloadAtom = atom(initialPayload);