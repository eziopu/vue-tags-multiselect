export default function clearHTML(string) {
  var regex = /\sdata-v-\w+=""/g;
  return string.replace(regex, "");
}
