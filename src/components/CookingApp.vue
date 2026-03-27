<script>
import axios from 'axios'

const DISH_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 400'%3E%3Crect width='640' height='400' rx='32' fill='%23eef2ff'/%3E%3Ccircle cx='320' cy='152' r='66' fill='%23c7d2fe'/%3E%3Cpath d='M214 268c28-34 71-52 106-52s78 18 106 52' fill='none' stroke='%234f46e5' stroke-width='24' stroke-linecap='round'/%3E%3Ctext x='320' y='340' text-anchor='middle' font-family='Segoe UI, Arial, sans-serif' font-size='28' font-weight='700' fill='%23334155'%3E%D0%91%D0%BB%D1%8E%D0%B4%D0%BE%20%D0%B1%D0%B5%D0%B7%20%D1%84%D0%BE%D1%82%D0%BE%3C/text%3E%3C/svg%3E"

const api = axios.create({
  baseURL: import.meta.env.PROD ? '' : 'http://localhost:3005'
})

export default {
  data() {
    return {
      dishes: [],
      cooking: [],
      selectedDish: null,
      title: '',
      preparation: '',
      timeToCook: '',
      image: '',
      error: '',
      refreshTimer: null,
      brokenDishImages: {},
      brokenCookingImages: {}
    }
  },

  computed: {
    cookedCount() {
      return this.cooking.filter(item => item.isCooked).length
    },

    cookingCount() {
      return this.cooking.filter(item => !item.isCooked).length
    }
  },

  methods: {
    async loadDishes() {
      try {
        const response = await api.get('/dishes')
        this.dishes = response.data
      } catch (error) {
        console.log(error)
        this.error = 'Не удалось загрузить блюда'
      }
    },

    async loadCooking() {
      try {
        const response = await api.get('/cooking')
        this.cooking = response.data
      } catch (error) {
        console.log(error)
        this.error = 'Не удалось загрузить приготовление'
      }
    },

    async loadDish(id) {
      try {
        const response = await api.get(`/dish?id=${id}`)
        this.selectedDish = response.data
      } catch (error) {
        console.log(error)
        this.error = 'Не удалось загрузить рецепт'
      }
    },

    async validateImage(url) {
      return new Promise(resolve => {
        const image = new Image()

        image.onload = () => resolve(true)
        image.onerror = () => resolve(false)
        image.src = url
      })
    },

    async createDish() {
      this.error = ''

      if (!this.title.trim() || !this.preparation.trim() || !this.timeToCook) {
        this.error = '?????????????? ?????? ???????? ??????????'
        return
      }

      const imageUrl = this.image.trim() || DISH_PLACEHOLDER

      if (this.image.trim()) {
        try {
          new URL(this.image)
        } catch {
          this.error = '???????????? ????????????????: ???????????????????????? ???????????? ???? ????????????????'
          return
        }

        const isImageValid = await this.validateImage(this.image)

        if (!isImageValid) {
          this.error = '???????????? ????????????????: ???????????????? ???? ?????????????????????? (??????????????????????????) ???? ???????? ????????????'
          return
        }
      }

      try {
        const response = await api.post('/dishes', {
          title: this.title,
          preparation: this.preparation,
          timeToCook: Number(this.timeToCook),
          image: imageUrl
        })

        this.dishes.push(response.data)

        this.title = ''
        this.preparation = ''
        this.timeToCook = ''
        this.image = ''
      } catch (error) {
        console.log(error)
        this.error = '???? ?????????????? ?????????????? ??????????'
      }
    },

    async sendToCook(id) {
      try {
        await api.post('/cooking/cook', { id })
        await this.loadCooking()
      } catch (error) {
        console.log(error)
        this.error = 'Не удалось отправить блюдо на готовку'
      }
    },

    async removeDish(id) {
      try {
        await api.delete(`/dishes/${id}`)
        this.dishes = this.dishes.filter(item => item.id !== id)
        this.cooking = this.cooking.filter(item => item.id !== id)

        if (this.selectedDish?.id === id) {
          this.selectedDish = null
        }
      } catch (error) {
        console.log(error)
        this.error = 'Не удалось удалить блюдо'
      }
    },

    async removeCooking(cookingId) {
      try {
        await api.delete(`/cooking/${cookingId}`)
        this.cooking = this.cooking.filter(item => item.cookingId !== cookingId)
      } catch (error) {
        console.log(error)
        this.error = 'Не удалось удалить блюдо из готовки'
      }
    },

    markDishImageBroken(id) {
      this.brokenDishImages = {
        ...this.brokenDishImages,
        [id]: true
      }
    },

    markCookingImageBroken(id) {
      this.brokenCookingImages = {
        ...this.brokenCookingImages,
        [id]: true
      }
    },

    isCooked(item) {
      return Boolean(item.isCooked)
    },

    getCookStatus(item) {
      if (item.isCooked) return 'Готово'
      return `${item.preparingTime} / ${item.timeToCook} мин`
    },

    getCookProgress(item) {
      if (!item.timeToCook) return 0
      return Math.min(100, Math.round((item.preparingTime / item.timeToCook) * 100))
    }
  },

  mounted() {
    this.loadDishes()
    this.loadCooking()

    this.refreshTimer = setInterval(() => {
      this.loadCooking()
    }, 5000)
  },

  beforeUnmount() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer)
    }
  }
}
</script>

<template>
  <div class="cook-app">
    <div class="cook-hero">
      <div class="hero-copy">
        <p class="eyebrow">Кухня</p>
        <h2 class="page-title">Блюда, рецепты и готовка</h2>
        <p class="page-subtitle">
          Открой рецепт, отправь блюдо на готовку и следи за прогрессом в реальном
          времени.
        </p>
      </div>

      <div class="hero-stats">
        <div class="stat-chip stat-chip-primary">
          <span class="stat-label">Всего блюд</span>
          <strong>{{ dishes.length }}</strong>
        </div>
        <div class="stat-chip">
          <span class="stat-label">Готовятся</span>
          <strong>{{ cookingCount }}</strong>
        </div>
        <div class="stat-chip stat-chip-success">
          <span class="stat-label">Готово</span>
          <strong>{{ cookedCount }}</strong>
        </div>
      </div>
    </div>

    <p v-if="error" class="alert-line">{{ error }}</p>

    <div class="cook-layout">
      <div class="left">
        <div class="panel">
          <div class="section-head">
            <div>
              <h3>Список блюд</h3>
              <span class="section-hint">Выбирай, что готовить дальше</span>
            </div>
          </div>

          <div class="dish-grid">
            <article class="dish-card" v-for="dish in dishes" :key="dish.id">
              <div class="dish-image-wrap">
                <img
                  v-if="!brokenDishImages[dish.id]"
                  :src="dish.image"
                  class="dish-image"
                  @error="markDishImageBroken(dish.id)"
                />
                <div v-else class="image-error-box">Ошибка загрузки изображения</div>
              </div>

              <div class="dish-body">
                <div class="dish-head">
                  <h4>{{ dish.title }}</h4>
                  <span class="meta-pill meta-pill-heat">{{ dish.timeToCook }} мин</span>
                </div>

                <p class="dish-text">{{ dish.preparation }}</p>

                <div class="dish-actions">
                  <button class="btn btn-outline-primary dish-btn" @click="loadDish(dish.id)">
                    Рецепт
                  </button>
                  <button class="btn btn-success dish-btn" @click="sendToCook(dish.id)">
                    Готовить
                  </button>
                  <button class="btn btn-outline-danger dish-btn" @click="removeDish(dish.id)">
                    Удалить
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div v-if="selectedDish" class="recipe-card">
          <div class="section-head compact">
            <div>
              <h3>{{ selectedDish.title }}</h3>
              <span class="section-hint">Полное описание рецепта</span>
            </div>
          </div>
          <div class="recipe-meta">
            <span class="meta-pill meta-pill-heat">Время {{ selectedDish.timeToCook }} мин</span>
          </div>
          <p class="recipe-text">{{ selectedDish.preparation }}</p>
        </div>
      </div>

      <div class="right">
        <div class="panel panel-sticky">
          <div class="section-head">
            <div>
              <h3>Добавить блюдо</h3>
              <span class="section-hint">Быстрое создание нового рецепта</span>
            </div>
          </div>

          <label class="field-label">Название</label>
          <input class="form-control field-control mb-3" v-model="title" type="text" />

          <label class="field-label">Описание рецепта</label>
          <textarea class="form-control field-control mb-3 area" v-model="preparation"></textarea>

          <label class="field-label">Время приготовления (мин)</label>
          <input class="form-control field-control mb-3" v-model="timeToCook" type="number" min="1" />

          <label class="field-label">Ссылка на изображение (необязательно)</label>
          <input class="form-control field-control mb-3" v-model="image" type="text" />

          <button class="btn btn-primary create-btn" @click="createDish">
            Создать блюдо
          </button>
        </div>

        <div class="panel">
          <div class="section-head compact">
            <div>
              <h3>Готовка</h3>
              <span class="section-hint">Автообновление каждые 5 секунд</span>
            </div>
          </div>

          <div class="status-row">
            <span class="status-chip status-chip-warm">Готовятся {{ cookingCount }}</span>
            <span class="status-chip status-chip-green">Готовы {{ cookedCount }}</span>
          </div>

          <div class="cooking-list">
            <article class="cooking-item" v-for="item in cooking" :key="item.cookingId">
              <div class="cook-thumb">
                <img
                  v-if="!brokenCookingImages[item.cookingId]"
                  :src="item.image"
                  class="mini-img"
                  @error="markCookingImageBroken(item.cookingId)"
                />
                <div v-else class="image-error-box small">Ошибка загрузки</div>
              </div>

              <div class="cooking-body">
                <div class="cooking-head">
                  <h4>{{ item.title }}</h4>
                  <span class="status-chip" :class="isCooked(item) ? 'status-chip-green' : 'status-chip-warm'">
                    {{ getCookStatus(item) }}
                  </span>
                </div>

                <div class="progress-track">
                  <div class="progress-fill" :style="{ width: `${getCookProgress(item)}%` }"></div>
                </div>

                <div class="cooking-actions">
                  <button class="btn btn-outline-danger dish-btn" @click="removeCooking(item.cookingId)">
                    Удалить из готовки
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cook-app {
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.cook-hero {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 18px;
  padding: 24px 24px 0;
}

.eyebrow {
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 12px;
  font-weight: 800;
  color: #5b6b86;
}

.page-title {
  margin: 0;
  font-size: clamp(28px, 3.1vw, 34px);
  line-height: 1.05;
  color: #0f172a;
}

.page-subtitle {
  margin: 10px 0 0;
  color: #64748b;
  max-width: 64ch;
}

.hero-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
}

.stat-chip {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 112px;
  padding: 12px 16px;
  border-radius: var(--radius-pill);
  background: #eef4ff;
  color: #19305e;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.stat-chip-primary {
  background: #e8eefc;
  color: #1e40af;
}

.stat-chip-success {
  background: #ecfdf3;
  color: #166534;
}

.stat-label {
  font-size: 11px;
  opacity: 0.78;
  margin-bottom: 4px;
  font-weight: 700;
}

.alert-line {
  margin: 18px 24px 0;
  padding: 12px 14px;
  color: var(--danger);
  background: var(--danger-soft);
  border: 1px solid rgba(180, 35, 24, 0.14);
  border-radius: var(--radius-sm);
  font-weight: 700;
}

.cook-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.9fr);
  gap: 20px;
  padding: 24px;
}

.left,
.right {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.panel,
.recipe-card {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-md);
  padding: 20px;
  box-shadow: var(--shadow-sm);
}

.panel-sticky {
  position: sticky;
  top: 16px;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 14px;
}

.section-head.compact {
  margin-bottom: 10px;
}

.section-head h3 {
  margin: 0;
  font-size: 20px;
  color: #0f172a;
}

.section-hint {
  color: #64748b;
  font-size: 13px;
}

.dish-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.dish-card {
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.dish-image-wrap,
.cook-thumb {
  width: 100%;
}

.dish-image {
  width: 100%;
  height: 196px;
  object-fit: cover;
}

.image-error-box {
  min-height: 210px;
  display: grid;
  place-items: center;
  padding: 18px;
  text-align: center;
  color: #991b1b;
  background: #fee2e2;
  font-weight: 800;
}

.image-error-box.small {
  min-height: 74px;
  min-width: 74px;
  border-radius: 14px;
  font-size: 12px;
}

.dish-body {
  padding: 14px;
}

.dish-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 10px;
}

.dish-head h4 {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
}

.dish-text {
  margin: 0 0 14px;
  color: #475569;
  line-height: 1.5;
  min-height: 48px;
}

.dish-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.dish-btn {
  border-radius: var(--radius-sm) !important;
}

.recipe-card {
  background: var(--card-muted);
}

.recipe-meta {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.recipe-text {
  margin: 0;
  color: #334155;
  line-height: 1.6;
}

.field-label {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 800;
  color: #334155;
}

.field-control {
  border-radius: var(--radius-sm) !important;
  border-color: #d7e0ec;
}

.area {
  min-height: 120px;
  resize: vertical;
}

.create-btn {
  width: 100%;
  padding: 12px 18px;
  border-radius: var(--radius-sm) !important;
}

.status-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.status-chip,
.meta-pill {
  display: inline-flex;
  align-items: center;
  border-radius: var(--radius-pill);
  padding: 7px 10px;
  font-size: 12px;
  font-weight: 800;
}

.meta-pill-heat {
  background: #fff4e6;
  color: #b45309;
}

.status-chip-warm {
  background: #fff4e6;
  color: #b45309;
}

.status-chip-green {
  background: #e8f6ee;
  color: #1f6d3d;
}

.cooking-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cooking-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 14px;
  border: 1px solid #e6edf6;
  border-radius: 16px;
  background: #fff;
}

.cook-thumb {
  width: 74px;
  flex: 0 0 74px;
}

.mini-img {
  width: 74px;
  height: 74px;
  object-fit: cover;
  border-radius: 14px;
  flex-shrink: 0;
}

.cooking-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cooking-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 8px;
}

.cooking-head h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.3;
  word-break: break-word;
}

.progress-track {
  height: 8px;
  border-radius: var(--radius-pill);
  background: #e8eef6;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #1d4ed8, #22c55e);
}

.cooking-actions {
  display: flex;
  justify-content: flex-start;
  margin-top: 2px;
}

.cooking-actions .dish-btn {
  min-width: 170px;
}

@media (max-width: 900px) {
  .cook-hero,
  .cook-layout {
    display: grid;
    grid-template-columns: 1fr;
  }

  .cook-hero {
    padding: 18px 18px 0;
  }

  .hero-stats {
    justify-content: flex-start;
  }

  .cook-layout {
    padding: 18px;
  }

  .dish-grid {
    grid-template-columns: 1fr;
  }

  .panel-sticky {
    position: static;
  }
}

@media (max-width: 640px) {
  .cook-layout {
    padding: 16px;
  }

  .dish-image,
  .image-error-box {
    height: 178px;
    min-height: 178px;
  }

  .cooking-item,
  .cooking-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .cook-thumb {
    width: 100%;
    flex-basis: auto;
  }

  .cooking-actions {
    width: 100%;
  }

  .cooking-actions .dish-btn {
    width: 100%;
    min-width: 0;
  }
}
</style>
