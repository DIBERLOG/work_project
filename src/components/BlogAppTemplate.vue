<script>
import BlogPost from './BlogPost.vue'

export default {
  components: {
    BlogPost
  },
  data() {
    return {
      posts: [
        {
          title: 'Как сделать lorem ipsum?',
          text: 'Для lorem ipsum нужно: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, earum consequatur debitis perferendis blanditiis quod deleniti ea officiis laudantium. Iste quae veritatis, nam atque iusto voluptatem asperiores libero fugiat incidunt.',
          author: 'Лорум Ипсум',
          date: '13.03.2024',
          comments: [
            'Круто!!!',
            'Недооценённый материал...',
            'Лучшее, что я читал.'
          ]
        },
        {
          title: 'Почему Vue удобен?',
          text: 'Vue удобен тем, что позволяет разбивать интерфейс на компоненты, передавать данные через props и обмениваться событиями через emit.',
          author: 'Иван Петров',
          date: '15.03.2024',
          comments: [
            'Очень полезно',
            'Стало понятнее',
            'Спасибо за объяснение'
          ]
        },
        {
          title: 'Что такое компоненты?',
          text: 'Компоненты — это переиспользуемые части интерфейса. Каждый компонент можно сделать независимым и удобным для поддержки.',
          author: 'Анна Смирнова',
          date: '18.03.2024',
          comments: [
            'Хороший пример',
            'Теперь ясно',
            'Отлично объяснено'
          ]
        }
      ],
      fontSize: 16
    }
  },
  methods: {
    fontSizeDecrease() {
      this.fontSize--
    },
    fontSizeIncrease() {
      this.fontSize++
    },
    fontSizeSet(fontSize) {
      this.fontSize = Number(fontSize)
    }
  }
}
</script>

<template>
  <main class="container">
    <h2 class="title">Посты:</h2>

    <div class="posts-list">
      <BlogPost
        v-for="post in posts"
        :key="post.title + post.date"
        :post="post"
        :fontSize="fontSize"
        @fontSizeIncrease="fontSizeIncrease"
        @fontSizeDecrease="fontSizeDecrease"
        @fontSizeSet="fontSizeSet"
      />
    </div>
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
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
</style>