<script setup lang="ts">

    type Props = {
        open: boolean
        onClose: () => void
    }

    const { open, onClose } = defineProps<Props>()
</script>

<template>
    <dialog id="reminderDialog" :open="open">
        <form id="reminderForm" method="dialog">
            <header class="dlg-header">
                <strong>New reminder</strong>
                <button type="button" id="dlgClose" aria-label="Cerrar" @click="onClose">✕</button>
            </header>
            <label>
                Date
                <input type="date" id="remDate" required>
            </label>
            <label>
                Text
                <input type="text" id="remText" placeholder="Meeting, etc." required maxlength="30" autofocus>
            </label>
            <label>
                City
                <input type="text" id="city" placeholder="City">
            </label>
            <label>
                City
                <input type="color" id="color">
            </label>
            <menu class="dlg-actions">
                <button type="reset">Limpiar</button>
                <button type="submit" class="primary">Guardar</button>
            </menu>
        </form>
    </dialog>
</template>

<style scoped>
    #reminderDialog {
        border: none; border-radius: 12px; padding: 0; max-width: 420px; width: 90%;
        box-shadow: 0 20px 80px var(--ring); background: var(--bg); color: var(--fg);
        position: absolute;
        bottom: 10%;
        left: 10%;
    }
    #reminderForm { display: grid; gap: .8rem; padding: 1rem; }
    .dlg-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: .5rem; }
    #dlgClose { background: transparent; border: none; font-size: 18px; cursor: pointer; color: var(--muted); }
    label { display: grid; gap: .25rem; font: 600 .85rem/1 Inter, system-ui; color: var(--muted); }
    input[type="date"], input[type="text"] {
        padding: .6rem .7rem; border-radius: 10px; border: 1px solid #ffffff20; background: var(--card); color: var(--fg);
    }
    .dlg-actions { display: flex; justify-content: flex-end; gap: .5rem; margin-top: .4rem; }
    .dlg-actions .primary {
        background: var(--today); color: white; border: none; padding: .55rem .9rem; border-radius: 10px; font-weight: 700; cursor: pointer;
    }
    .dlg-actions button:not(.primary) {
        background: transparent; color: var(--muted); border: 1px solid #ffffff20; padding: .55rem .9rem; border-radius: 10px; cursor: pointer;
    }
    dialog::backdrop { background: rgba(0,0,0,.35); }
</style>