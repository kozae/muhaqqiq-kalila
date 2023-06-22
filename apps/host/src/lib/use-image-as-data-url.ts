import useSWR from "swr";

export default function useImageAsDataUrl(url?: string | null) {
  const { data } = useSWR(url, (props) => loadImageAsDataUrl(props));

  return data;
}

export async function loadImageAsDataUrl(url: string) {
  const data: string = await fetch(url)
    .then((response) => {
      return response.blob();
    })
    .then(
      (blob) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = function () {
            resolve(this.result as string);
          };
          reader.readAsDataURL(blob);
        })
    );

  return data;
}
