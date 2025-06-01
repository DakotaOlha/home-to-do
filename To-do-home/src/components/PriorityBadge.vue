<script setup>
const props = defineProps({
  priority: {
    type: String,
    required: true,
    validator: (value) => ['high', 'medium', 'low'].includes(value)
  }
})

const priorityClasses = {
  high: 'high-priority',
  medium: 'medium-priority',
  low: 'low-priority'
}

const priorityLabels = {
  high: 'Високий',
  medium: 'Середній',
  low: 'Низький'
}
</script>

<template>
  <span :class="['priority-badge', priorityClasses[priority]]">
    {{ priorityLabels[priority] }}
  </span>
</template>

<style scoped>
.priority-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  color: white;
}

.high-priority {
  background-color: #e74c3c;
}

.medium-priority {
  background-color: #f39c12;
}

.low-priority {
  background-color: #2ecc71;
}
</style>