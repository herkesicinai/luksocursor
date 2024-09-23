export default function imageLoader({ src, width, quality }) {
  if (src.startsWith("ipfs://")) {
    return `https://api.universalprofile.cloud/ipfs/${src.slice(
      7
    )}?w=${width}&q=${quality}`;
  }
  return `${src}?w=${width}&q=${quality}`;
}
