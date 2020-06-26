const DEFAULT_SNACKBAR_TIMEOUT = 2000;

export function showSnackbar(
  context: any,
  text: string,
  timeout?: { value?: number; factor?: number }
) {
  context.snackbar.text = text;
  context.snackbar.timeout = timeout
    ? timeout.value || (timeout.factor || 1) * DEFAULT_SNACKBAR_TIMEOUT
    : DEFAULT_SNACKBAR_TIMEOUT;
  context.snackbar.snackbar = true;
}
