
export default function Today(inputDate) {
  const today = new Date().getUTCDate();
  const input = new Date(inputDate).getUTCDate();
  if (today === input) {
    return 1;
  } else {
    return -1;
  }

}
