export function copyToClipboard() {
  const ffcURL = document.getElementById("ffc-url") as HTMLInputElement;
  if (!ffcURL) return;
  ffcURL.select();
  ffcURL.setSelectionRange(0, ffcURL.value.length);
  document.execCommand("copy");
  ffcURL.blur();
}
