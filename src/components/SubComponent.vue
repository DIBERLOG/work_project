<script>
export default {
  props: {
    counter: Number
  }
}
</script>

<template>
  <div class="sub-box">
    <h4>Кнопка в дочернем компоненте</h4>
    <button class="counter-btn child-btn" @click="$emit('counterPlus')">
      {{ counter }}
    </button>
  </div>
</template>

<style scoped>
.sub-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(241, 245, 249, 0.94));
  border: 1px solid rgba(148, 163, 184, 0.18);
}

.sub-box h4 {
  margin: 0;
  text-align: center;
  font-size: 22px;
}

.counter-btn {
  width: 96px;
  height: 96px;
  border: none;
  border-radius: 24px;
  color: white;
  font-size: 34px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 16px 28px rgba(15, 23, 42, 0.14);
}

.child-btn {
  background: linear-gradient(135deg, #7c3aed, #c026d3);
}
</style>
