import { AMOC_TO_STATE_IDS } from "./static/amocToStateId"

export function getAmocToStateId(state: string): string {
  
  return state ? AMOC_TO_STATE_IDS.find((item) => item.state === state.toUpperCase())?.id || "" : "";

  // switch (state) {
  //   case "NT":
  //     return "IDD";
  //   case "NSW":
  //     return "IDN";
  //   case "Qld":
  //     return "IDQ";
  //   case "SA":
  //     return "IDS";
  //   case "Tas":
  //     return "IDT";
  //   case "Vic":
  //     return "IDV";
  //   case "WA":
  //     return "IDW";
  //   case "ACT":
  //     return "IDN";
  // }

  // return "unk";
}
