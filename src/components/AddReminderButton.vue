<template>
    <button
      id="fabAdd" 
      class="fab" 
      aria-label="Agregar recordatorio" 
      title="Agregar recordatorio" 
      @click="store.openModal"
    >
      +
    </button>
</template>

<script setup lang="ts">
  import { useReminderStore } from '../store/useRemidersStore';
  const store = useReminderStore()
</script>

<style scoped>
  .fab {
    position: absolute;
    right: 16px;
    bottom: 16px;
    width: 52px;
    height: 52px;
    border-radius: 999px;
    border: none;
    background: var(--today);
    color: white;
    font: 700 28px/52px Inter, system-ui;
    box-shadow: 0 4px 16px var(--ring);
    cursor: pointer;
  }
  .fab:focus-visible { outline: 3px solid var(--ring); }
</style>