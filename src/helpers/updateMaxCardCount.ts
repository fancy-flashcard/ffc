import { showSnackbar } from "./snackbarHelper";

export function updateMaxCardCount(context: any, newValue: string) {
  context.maxCardCount = newValue;
  newValue !== "0"
    ? showSnackbar(
        context,
        "Successfully updated max card count to " + newValue + "."
      )
    : showSnackbar(context, "Successfully deactivated max card count.");
}
