<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  solid: {
    type: Boolean,
    default: false,
  },
  dark: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button type="button" class="btn" :class="{ 'btn--solid': solid, 'btn--dark': dark, 'btn--error': error }">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  border: 1px solid #3fa649;
  border-radius: 25px 0 25px 0;
  box-sizing: border-box;
  /*color: inherit;*/
  display: inline-block;
  font-family: Poppins, sans-serif;
  font-size: 13.67px;
  letter-spacing: 0;
  padding: 10px 23px;
  line-height: 18px;
  transition: all .2s ease;
  text-align: center;

  @media (max-width: 359px) {
    margin-bottom: 20px;
  }

  @media (min-width: 999px) {
    min-width: 165px;
  }

}

.btn:hover {
  background: #3fa649;
  border-radius: 25px;
  color: #fff;
}

.btn--header {
  font-size: 12.67px;
  border-radius: 20px 0 20px 0
}

.btn--header:hover {
  border-radius: 20px
}

.btn--large,
.btn.large {
  padding: 15px 23px
}

.btn--dark {
  color: #fff
}

.btn--dark,
.btn--dark:hover {
  background: #183d52;
  border-color: #183d52
}

.btn--solid {
  border-color: #41ab4b;
  background: #41ab4b;
  color: #fff
}

.btn--solid:hover {
  border-color: #00880d;
  background: #00880d
}

.btn--error {
  border-color: #dc3545;
  background: #dc3545;
}

.btn--error:hover {
  border-color: #b02a37;
  background: #b02a37;
}
</style>