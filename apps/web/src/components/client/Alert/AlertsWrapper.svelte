<script lang="ts">
  import { onMount } from "svelte";
  import { alertSubject, type AlertType } from "./alert-listner";
  import Alert from "./Alert.svelte";
  import { writable, type Writable, derived } from "svelte/store";

  const alerts: Writable<{ message: string; type: AlertType; id: number }[]> =
    writable([]);

  const hasAlerts = derived(alerts, ($alerts) => $alerts.length > 0);

  let nextId = 0;

  function dismissAlert(id: number) {
    alerts.update((currentAlerts) =>
      currentAlerts.filter((alert) => alert.id !== id),
    );
  }

  onMount(() => {
    const subscription = alertSubject.subscribe(({ message, type }) => {
      alerts.update((currentAlerts) => [
        ...currentAlerts,
        { message, type, id: nextId++ },
      ]);

      setTimeout(() => {
        dismissAlert(nextId - 1);
      }, 15000);
    });

    return () => {
      subscription.unsubscribe();
    };
  });
</script>

{#if $hasAlerts}
  <div
    class="fixed top-0 left-1/2 transform -translate-x-1/2 flex flex-col justify-start items-stretch gap-5 overflow-x-auto w-72 h-screen opacity-90"
  >
    {#each $alerts as { message, type, id } (id)}
      <Alert {message} alertType={type} on:dismiss={() => dismissAlert(id)} />
    {/each}
  </div>
{/if}
