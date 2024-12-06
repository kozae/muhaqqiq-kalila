<script lang="ts">
  export let path: string;
  export let api: string;

  console.log({ path }, { api });

  const onClick = async () => {
    if (!path || !api) {
      console.error("Path or API is not defined");
      return;
    }
    const response = await fetch(`${api}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({ path }),
    });
    if (!response.ok) {
      console.error("Failed to fetch", response);
      return;
    }
    const data = await response.text();
    console.log(data);
  };
</script>

<button
  type="button"
  class="rounded-full bg-primary-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
  on:click={onClick}>Reavlidate</button
>
