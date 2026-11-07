<template>
  <footer>
    <div class="wrap">
      <p>© {{ currentYear }} {{ fullName }}</p>
    </div>
  </footer>
</template>

<script setup>
defineProps({
  fullName: String
})

const currentYear = new Date().getFullYear()
</script>

<style scoped>
footer {
  background: var(--panel);
  color: var(--panel-muted);
  font-size: 0.875rem;
}

p {
  padding-block: 1.25rem;
  border-top: 1px solid var(--panel-rule);
}
</style>
