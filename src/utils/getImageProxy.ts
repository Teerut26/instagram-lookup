export default function getImageProxy(url: string) {
  return `/proxy/image?url=${encodeURIComponent(url)}`;
}
