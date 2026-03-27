<script>
export default {
  props: {
    book: Object
  }
}
</script>

<template>
  <div class="card">
    <div class="cover" :style="{ background: book.color }">
      <div class="cover-overlay"></div>
      <div class="cover-title">{{ book.title }}</div>
    </div>

    <div class="content">
      <p class="author">{{ book.author }}</p>
      <h3 class="book-title">{{ book.title }}</h3>
      <p class="rating">Рейтинг: {{ book.rating }}★</p>

      <button class="buy-btn" @click="$emit('buyBook', book.id)">
        Добавить в корзину
      </button>

      <p class="cart-text">В корзине: {{ book.inCart }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
}

.cover {
  position: relative;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  padding: 16px;
}

.cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.08), rgba(15, 23, 42, 0.28));
}

.cover-title {
  position: relative;
  max-width: 180px;
  line-height: 1.2;
  font-size: 20px;
}

.content {
  padding: 18px;
}

.author {
  margin: 0 0 6px;
  font-size: 12px;
  color: #7a7a7a;
  text-transform: uppercase;
}

.book-title {
  margin: 0 0 12px;
  font-size: 20px;
  line-height: 1.2;
}

.rating {
  margin: 0 0 14px;
  color: #f0a500;
  font-size: 15px;
  font-weight: 800;
}

.buy-btn {
  width: 100%;
  padding: 12px 0;
  margin-bottom: 12px;
}

.cart-text {
  margin: 0;
  font-size: 15px;
  color: #475569;
  font-weight: 700;
}

@media (max-width: 720px) {
  .cover {
    height: 236px;
  }
}
</style>
