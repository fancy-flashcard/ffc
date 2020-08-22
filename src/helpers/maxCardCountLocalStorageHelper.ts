import { get, set } from "./localStorageHelper";
import { Event } from "../types";

export function getMaxCardCount() {
  const maxCardCount = parseInt(get("maxCardCount"));
  if (isNaN(maxCardCount)) {
    const defaultValue = 0;
    set("maxCardCount", defaultValue.toString());

    return defaultValue;
  } else {
    return maxCardCount;
  }
}

export function setMaxCardCount(context: any, maxCardCount: number) {
  try {
    set("maxCardCount", maxCardCount.toString());
    context.$eventHub.$emit(
      Event.SNACKBAR_EVENT,
      "Successfully updated max card count to " + maxCardCount + "."
    );
  } catch (e) {
    context.$eventHub.$emit(Event.SNACKBAR_EVENT, e);
  }
}
