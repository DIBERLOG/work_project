<script>
import BookCard from './BookCard.vue'

export default {
  components: {
    BookCard
  },
  data() {
    return {
      books: [
        {
          id: 1,
          author: 'ИВАН ИВАНОВИЧ',
          title: 'Кладовки - лучшая альтернатива для IT',
          rating: 4.2,
          inCart: 3,
          color: '#45d6a8'
        },
        {
          id: 2,
          author: 'ИВАН ИВАНОВИЧ',
          title: 'Исповедь Питониста',
          rating: 4.76,
          inCart: 3,
          color: '#f3a1a1'
        },
        {
          id: 3,
          author: 'ИВАН ИВАНОВИЧ',
          title: 'Пособие для сов программистов',
          rating: 3.15,
          inCart: 3,
          color: '#58aee8'
        },
        {
          id: 4,
          author: 'ИВАН ИВАНОВИЧ',
          title: 'Бэкенд или фронтенд?',
          rating: 4.99,
          inCart: 4,
          color: '#b565e7'
        }
      ]
    }
  },
  computed: {
    totalBooksInCart() {
      return this.books.reduce((sum, book) => sum + book.inCart, 0)
    }
  },
  methods: {
    buyBook(bookId) {
      const book = this.books.find(item => item.id === bookId)
      if (book) {
        book.inCart++
      }
    }
  }
}
</script>

<template>
  <main class="container">
    <h2 class="title">Книги недели:</h2>

    <div class="books-grid">
      <BookCard
        v-for="book in books"
        :key="book.id"
        :book="book"
        @buyBook="buyBook"
      />
    </div>

    <h2 class="total">Всего книг в корзине: {{ totalBooksInCart }}</h2>
  </main>
</template>

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px;
}

.title {
  margin: 0 0 16px;
  font-size: 24px;
  font-weight: 700;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.total {
  margin-top: 18px;
  font-size: 20px;
  color: var(--text-soft);
}

@media (max-width: 1000px) {
  .books-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .books-grid {
    grid-template-columns: 1fr;
  }
}
</style>
