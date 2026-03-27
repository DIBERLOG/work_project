<script>
export default {
  data() {
    return {
      words: ['Первый слайд', 'Второй слайд', 'Третий слайд'],
      images: [
        'https://picsum.photos/seed/vue1/600/350',
        'https://picsum.photos/seed/vue2/600/350',
        'https://picsum.photos/seed/vue3/600/350'
      ],
      index: 0
    }
  },
  methods: {
    next() {
      if (this.index < this.words.length - 1) {
        this.index++
      } else {
        this.index = 0
      }
    },
    prev() {
      if (this.index > 0) {
        this.index--
      } else {
        this.index = this.words.length - 1
      }
    }
  }
}
</script>

<template>
  <div class="gallery">
    <button @click="prev" class="btn">Назад</button>

    <div class="content">
      <div class="gallery-head">
        <span>{{ words[index] }}</span>
        <small>Слайд {{ index + 1 }} / {{ words.length }}</small>
      </div>

      <img :src="images[index]" alt="gallery image" />

      <div class="dots">
        <span
          v-for="(word, dotIndex) in words"
          :key="word"
          class="dot"
          :class="{ active: dotIndex === index }"
        ></span>
      </div>
    </div>

    <button @click="next" class="btn">Вперёд</button>
  </div>
</template>

<style scoped>
.gallery {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px;
  border-radius: var(--radius);
  background: #fff;
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
}

.gallery-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
}

.gallery-head span {
  font-size: 22px;
  font-weight: 700;
}

.gallery-head small {
  color: #64748b;
  font-weight: 700;
}

img {
  width: min(100%, 520px);
  height: 280px;
  object-fit: cover;
  border: 1px solid rgba(101, 116, 139, 0.16);
  border-radius: 18px;
}

.dots {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.4);
}

.dot.active {
  width: 28px;
  background: var(--primary);
}

@media (max-width: 720px) {
  .gallery-head {
    flex-direction: column;
    align-items: flex-start;
  }

  img {
    height: 220px;
  }
}
</style>
