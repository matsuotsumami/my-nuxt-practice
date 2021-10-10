<script lang="tsx">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const testClick = () => {
      window.alert('Test')
    }
    return () => (
      <div class="container">
        <div>
          <h1 class="title">my-nuxt-practice</h1>
          <div class="links">
            <a
              href="https://nuxtjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              class="button--green"
            >
              Documentation
            </a>
            <a
              href="https://github.com/nuxt/nuxt.js"
              target="_blank"
              rel="noopener noreferrer"
              class="button--grey"
            >
              GitHub
            </a>
            <button onClick={testClick}>Test</button>
          </div>
        </div>
      </div>
    )
  },
})
</script>
