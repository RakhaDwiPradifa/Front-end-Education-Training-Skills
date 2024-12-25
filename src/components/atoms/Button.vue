<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}>();
</script>

<template>
  <button
    :class="[
      'btn',
      {
        'btn-primary': variant === 'primary',
        'bg-gray-600 hover:bg-gray-700': variant === 'secondary',
        'border-2 border-primary text-primary hover:bg-primary hover:text-white': variant === 'outline',
        'px-3 py-1 text-sm': size === 'sm',
        'px-4 py-2': size === 'md',
        'px-6 py-3 text-lg': size === 'lg',
      }
    ]"
  >
    <slot/>
  </button>
</template>