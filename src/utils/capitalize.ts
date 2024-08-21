// Transforms a string.
// Makes the first character uppercase and the other following ones stays lowercase.
export default function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.substring(1, string.length);
}
