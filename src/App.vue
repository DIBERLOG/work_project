<script>
import BlogAppTemplate from './components/BlogAppTemplate.vue'
import BookAppTemplate from './components/BookAppTemplate.vue'
import ClickCounter from './components/ClickCounter.vue'
import CurrencyAppTemplate from './components/CurrencyAppTemplate.vue'
import LanguageSelector from './components/LanguageSelector.vue'
import ParentCounter from './components/ParentCounter.vue'
import TestApp from './components/TestApp.vue'
import TextAnalyzer from './components/TextAnalyzer.vue'
import TextGallery from './components/TextGallery.vue'
import TrackerAppTemplate from './components/TrackerAppTemplate.vue'
import UserAppTemplate from './components/UserAppTemplate.vue'
import VoteApp from './components/VoteApp.vue'
import GardenApp from './components/GardenApp.vue'
import CookingApp from './components/CookingApp.vue'

export default {
  components: {
    BlogAppTemplate,
    BookAppTemplate,
    ClickCounter,
    CurrencyAppTemplate,
    LanguageSelector,
    ParentCounter,
    TestApp,
    TextAnalyzer,
    TextGallery,
    TrackerAppTemplate,
    UserAppTemplate,
    VoteApp,
    GardenApp,
    CookingApp
  },

  data() {
    return {
      sections: [
        { id: 'blog', label: 'Блог' },
        { id: 'book', label: 'Книги' },
        { id: 'counter', label: 'Счётчик' },
        { id: 'gallery', label: 'Галерея' },
        { id: 'language', label: 'Языки' },
        { id: 'analyzer', label: 'Анализ' },
        { id: 'parent', label: 'Props' },
        { id: 'test', label: 'Тест' },
        { id: 'currency', label: 'Bitcoin' },
        { id: 'user', label: 'Возраст' },
        { id: 'tracker', label: 'Посылки' },
        { id: 'vote', label: 'Голосование' },
        { id: 'garden', label: 'Ферма' },
        { id: 'cooking', label: 'Готовка' }
      ]
    }
  },

  methods: {
    scrollToSection(id) {
      const el = document.getElementById(id)

      if (!el) return

      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    },

    scrollToBottom() {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<template>
  <div class="page-shell">
    <header class="hero">
      <div class="hero-glow hero-glow-a"></div>
      <div class="hero-glow hero-glow-b"></div>

      <div class="container hero-inner">
        <div class="hero-copy">
          <p class="eyebrow">Vue workshop</p>
          <h1>Учебный проект с живой навигацией, фермой и готовкой</h1>
          <p class="hero-text">
            Блоки собраны в один длинный интерфейс, но по ним можно быстро прыгать сверху
            вниз. Фокус на читаемости, плотности информации и быстрых действиях.
          </p>

          <div class="hero-actions">
            <button class="hero-button primary" @click="scrollToSection('garden')">
              Перейти к ферме
            </button>
            <button class="hero-button secondary" @click="scrollToBottom">
              В конец страницы
            </button>
          </div>
        </div>

        <aside class="hero-panel">
          <div class="panel-chip">14 модулей</div>
          <div class="panel-title">Быстрый переход</div>
          <div class="quick-nav">
            <button
              v-for="section in sections"
              :key="section.id"
              class="quick-link"
              @click="scrollToSection(section.id)"
            >
              {{ section.label }}
            </button>
          </div>
        </aside>
      </div>
    </header>

    <main class="content-grid">
      <section id="blog" class="module-card module-card-hero">
        <div class="section-header">
          <div>
            <p class="section-kicker">Старт</p>
            <h2 class="section-title">Блог</h2>
          </div>
          <button class="section-jump" @click="scrollToBottom">В конец</button>
        </div>
        <BlogAppTemplate />
      </section>

      <section id="book" class="module-card">
        <div class="section-header">
          <div>
            <p class="section-kicker">Каталог</p>
            <h2 class="section-title">Книги</h2>
          </div>
        </div>
        <BookAppTemplate />
      </section>

      <section id="counter" class="module-card">
        <div class="section-header">
          <div>
            <p class="section-kicker">Практика</p>
            <h2 class="section-title">Счётчик</h2>
          </div>
        </div>
        <ClickCounter />
      </section>

      <section id="gallery" class="module-card">
        <div class="section-header">
          <div>
            <p class="section-kicker">Визуал</p>
            <h2 class="section-title">Галерея</h2>
          </div>
        </div>
        <TextGallery />
      </section>

      <section id="language" class="module-card">
        <div class="section-header">
          <div>
            <p class="section-kicker">UI</p>
            <h2 class="section-title">Выбор языка</h2>
          </div>
        </div>
        <LanguageSelector />
      </section>

      <section id="analyzer" class="module-card">
        <div class="section-header">
          <div>
            <p class="section-kicker">Текст</p>
            <h2 class="section-title">Анализ и переворот</h2>
          </div>
        </div>
        <TextAnalyzer />
      </section>

      <section id="parent" class="module-card">
        <div class="section-header">
          <div>
            <p class="section-kicker">Коммуникация</p>
            <h2 class="section-title">Props + $emit</h2>
          </div>
        </div>
        <ParentCounter />
      </section>

      <section id="test" class="module-card">
        <div class="section-header">
          <div>
            <p class="section-kicker">Проверка</p>
            <h2 class="section-title">Тест</h2>
          </div>
        </div>
        <TestApp />
      </section>

      <section id="currency" class="module-card">
        <div class="section-header">
          <div>
            <p class="section-kicker">Данные</p>
            <h2 class="section-title">Курс Bitcoin</h2>
          </div>
        </div>
        <CurrencyAppTemplate />
      </section>

      <section id="user" class="module-card">
        <div class="section-header">
          <div>
            <p class="section-kicker">Сервис</p>
            <h2 class="section-title">Узнаем возраст</h2>
          </div>
        </div>
        <UserAppTemplate />
      </section>

      <section id="tracker" class="module-card">
        <div class="section-header">
          <div>
            <p class="section-kicker">Логистика</p>
            <h2 class="section-title">Отслеживание посылок</h2>
          </div>
        </div>
        <TrackerAppTemplate />
      </section>

      <section id="vote" class="module-card">
        <div class="section-header">
          <div>
            <p class="section-kicker">Сообщество</p>
            <h2 class="section-title">Голосования</h2>
          </div>
        </div>
        <VoteApp />
      </section>

      <section id="garden" class="module-card module-card-highlight">
        <div class="section-header">
          <div>
            <p class="section-kicker">Игровой блок</p>
            <h2 class="section-title">Магазин растений</h2>
          </div>
          <button class="section-jump accent" @click="scrollToSection('cooking')">
            К готовке
          </button>
        </div>
        <GardenApp />
      </section>

      <section id="cooking" class="module-card module-card-highlight">
        <div class="section-header">
          <div>
            <p class="section-kicker">Новый блок</p>
            <h2 class="section-title">Блюда и готовка</h2>
          </div>
          <button class="section-jump accent" @click="scrollToSection('blog')">
            Наверх
          </button>
        </div>
        <CookingApp />
      </section>
    </main>

    <button class="floating-bottom" @click="scrollToBottom">В конец</button>
  </div>
</template>

<style>
:root {
  --page-bg: #f3f5f8;
  --page-bg-soft: #fafbfc;
  --card: #ffffff;
  --card-muted: #f8fafc;
  --text: #1f2937;
  --text-soft: #475569;
  --muted: #6b7280;
  --line: #d7dee7;
  --line-strong: #c3ced9;
  --primary: #2563eb;
  --primary-strong: #1d4ed8;
  --accent: #0f766e;
  --danger: #b91c1c;
  --success: #166534;
  --shadow-sm: 0 4px 14px rgba(15, 23, 42, 0.05);
  --shadow-md: 0 10px 28px rgba(15, 23, 42, 0.08);
  --radius: 18px;
  --radius-sm: 12px;
  --content-width: 1180px;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  background: linear-gradient(180deg, var(--page-bg-soft) 0%, var(--page-bg) 100%);
  color: var(--text);
}

button {
  font: inherit;
}

.page-shell {
  padding-bottom: 96px;
}

.container {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 0 24px;
}

.hero {
  position: relative;
  overflow: hidden;
  color: #fff;
  padding: 28px 0 26px;
  margin-bottom: 24px;
  background: linear-gradient(180deg, #1f2937 0%, #243244 100%);
  box-shadow: var(--shadow-md);
}

.hero-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.3fr 0.9fr;
  gap: 20px;
  align-items: stretch;
}

.hero-copy,
.hero-panel,
.module-card {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
}

.hero-copy {
  padding: 24px;
  background: rgba(255, 255, 255, 0.04);
}

.eyebrow,
.section-kicker {
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.72);
  margin: 0 0 10px;
}

.hero h1 {
  margin: 0;
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.12;
  max-width: 14ch;
  font-weight: 700;
}

.hero-text {
  max-width: 64ch;
  margin: 14px 0 0;
  font-size: 16px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.78);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.hero-button,
.section-jump,
.quick-link,
.floating-bottom {
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
}

.hero-button:hover,
.section-jump:hover,
.quick-link:hover,
.floating-bottom:hover {
  transform: translateY(-1px);
}

.hero-button {
  min-height: 42px;
  padding: 10px 16px;
  border: 1px solid transparent;
  font-weight: 600;
}

.hero-button.primary {
  background: #ffffff;
  color: #1f2937;
  box-shadow: none;
}

.hero-button.secondary {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.16);
}

.hero-panel {
  padding: 20px;
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.panel-chip {
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 11px;
  font-weight: 600;
}

.panel-title {
  font-size: 16px;
  font-weight: 700;
}

.quick-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.quick-link {
  min-height: 38px;
  padding: 8px 14px;
  color: #e5edf6;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  font-size: 14px;
  font-weight: 600;
}

.content-grid {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  gap: 18px;
}

.module-card {
  background: var(--card);
  padding: 24px;
  scroll-margin-top: 20px;
}

.module-card-hero {
  border-top: 3px solid var(--primary);
}

.module-card-highlight {
  background: var(--card);
}

.section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 16px;
}

.section-kicker {
  color: var(--muted);
  margin-bottom: 6px;
}

.section-title {
  margin: 0;
  font-size: clamp(22px, 2.3vw, 30px);
  line-height: 1.18;
  font-weight: 700;
}

.section-jump {
  min-height: 42px;
  padding: 9px 16px;
  background: linear-gradient(180deg, #ffffff 0%, #f6f8fb 100%);
  border: 1px solid #d7e0ea;
  color: var(--text);
  border-radius: 12px;
  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.92);
  font-weight: 600;
  flex: 0 0 auto;
}

.section-jump:hover {
  background: linear-gradient(180deg, #ffffff 0%, #edf2f7 100%);
  color: var(--text);
}

.section-jump.accent {
  background: linear-gradient(180deg, #f4fbf8 0%, #eaf7f1 100%);
  border-color: #cde5d8;
  color: #166534;
}

.floating-bottom {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 30;
  min-height: 46px;
  padding: 10px 18px;
  background: linear-gradient(180deg, #ffffff 0%, #f6f8fb 100%);
  border: 1px solid #d7e0ea;
  border-radius: 14px;
  color: #fff;
  color: var(--text);
  box-shadow:
    0 10px 24px rgba(15, 23, 42, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.module-card :deep(input),
.module-card :deep(textarea),
.module-card :deep(select),
.module-card :deep(.form-control) {
  border-radius: var(--radius-sm);
  border: 1px solid var(--line);
  background: #fff;
  box-shadow: none;
  color: var(--text);
}

.module-card :deep(input:focus),
.module-card :deep(textarea:focus),
.module-card :deep(select:focus),
.module-card :deep(.form-control:focus) {
  outline: none;
  border-color: rgba(37, 99, 235, 0.45);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.module-card :deep(button),
.module-card :deep(.btn),
.module-card :deep(.btn-primary),
.module-card :deep(.btn-success),
.module-card :deep(.btn-danger) {
  font-family: inherit;
}

.module-card :deep(button:not(.hero-button):not(.section-jump):not(.quick-link):not(.floating-bottom)),
.module-card :deep(.btn) {
  min-height: 42px;
  padding: 9px 16px;
  border-radius: 12px !important;
  border: 1px solid transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.01em;
  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease,
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease;
}

.module-card :deep(.btn-primary),
.module-card :deep(.btn-success),
.module-card :deep(.btn-danger),
.module-card :deep(.btn-outline-primary),
.module-card :deep(.btn-outline-success),
.module-card :deep(.btn-outline-danger),
.module-card :deep(.btn-outline-secondary) {
  border-width: 1px;
  border-radius: 12px !important;
}

.module-card :deep(.btn-primary),
.module-card :deep(.btn-success) {
  color: #fff;
}

.module-card :deep(.btn-primary) {
  background: linear-gradient(180deg, #4f89f7 0%, var(--primary) 100%);
  border-color: #356fda;
}

.module-card :deep(.btn-success) {
  background: linear-gradient(180deg, #289e84 0%, var(--accent) 100%);
  border-color: #1f7e69;
}

.module-card :deep(.btn-danger) {
  color: #fff;
  background: linear-gradient(180deg, #ef6a6a 0%, var(--danger) 100%);
  border-color: #d84d4d;
}

.module-card :deep(.btn-outline-primary) {
  color: var(--primary-strong);
  border-color: #cbd9f5;
  background: linear-gradient(180deg, #ffffff 0%, #f6f9ff 100%);
}

.module-card :deep(.btn-outline-success) {
  color: var(--accent);
  border-color: #cfe2dc;
  background: linear-gradient(180deg, #ffffff 0%, #f4faf8 100%);
}

.module-card :deep(.btn-outline-danger) {
  color: var(--danger);
  border-color: #f0cccc;
  background: linear-gradient(180deg, #ffffff 0%, #fff7f7 100%);
}

.module-card :deep(.btn-outline-secondary) {
  color: var(--text-soft);
  border-color: #d6dee8;
  background: linear-gradient(180deg, #ffffff 0%, #f7f9fc 100%);
}

.module-card :deep(button:hover),
.module-card :deep(.btn:hover) {
  transform: translateY(-1px);
  box-shadow:
    0 10px 18px rgba(15, 23, 42, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.92);
}

.module-card :deep(.btn-primary:hover) {
  background: linear-gradient(180deg, #5a91fa 0%, #2f73ed 100%);
  border-color: #2f6bdd;
}

.module-card :deep(.btn-success:hover) {
  background: linear-gradient(180deg, #2ba68a 0%, #1d826c 100%);
  border-color: #1b755f;
}

.module-card :deep(.btn-danger:hover) {
  background: linear-gradient(180deg, #f37272 0%, #e35353 100%);
  border-color: #cf4747;
}

.module-card :deep(.btn-outline-primary:hover) {
  color: #fff;
  background: linear-gradient(180deg, #4b86f5 0%, var(--primary) 100%);
  border-color: #356fda;
}

.module-card :deep(.btn-outline-success:hover) {
  color: #fff;
  background: linear-gradient(180deg, #269a81 0%, var(--accent) 100%);
  border-color: #1f7e69;
}

.module-card :deep(.btn-outline-danger:hover) {
  color: #fff;
  background: linear-gradient(180deg, #ee6a6a 0%, var(--danger) 100%);
  border-color: #d84d4d;
}

.module-card :deep(.btn-outline-secondary:hover) {
  color: var(--text);
  background: linear-gradient(180deg, #ffffff 0%, #edf2f7 100%);
  border-color: #c8d1dc;
}

.module-card :deep(button:focus-visible),
.module-card :deep(.btn:focus-visible),
.section-jump:focus-visible,
.quick-link:focus-visible,
.floating-bottom:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 3px rgba(37, 99, 235, 0.14),
    0 10px 18px rgba(15, 23, 42, 0.08);
}

.module-card :deep(button:active),
.module-card :deep(.btn:active),
.section-jump:active,
.quick-link:active,
.floating-bottom:active {
  transform: translateY(0);
  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.88);
}

.module-card :deep(.box),
.module-card :deep(.lang-box),
.module-card :deep(.parent-box),
.module-card :deep(.clicker),
.module-card :deep(.container-box) {
  padding: 18px;
  border-radius: var(--radius);
  background: var(--card-muted);
  border: 1px solid var(--line);
}

@media (max-width: 960px) {
  .hero-inner {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 768px) {
  .hero {
    padding-top: 24px;
  }

  .hero-copy,
  .hero-panel,
  .module-card {
    padding: 20px;
  }

  .container,
  .content-grid {
    padding-left: 16px;
    padding-right: 16px;
  }

  .hero h1 {
    max-width: none;
  }

  .floating-bottom {
    right: 14px;
    bottom: 14px;
  }
}
</style>
