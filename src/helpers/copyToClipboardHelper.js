export function copyToClipboard() {
  let ffcURL = document.getElementById("ffc-url");
  ffcURL.select();
  ffcURL.setSelectionRange(0, 99999);
  document.execCommand("copy");
}
