export default function today(inputDate) {
  const today = new Date().getDate();
  const input = new Date(inputDate).getDate();
  if (today === input) {
    return 1;
  } else {
    return -1;
  }
}
