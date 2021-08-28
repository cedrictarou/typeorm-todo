<template>
  <div>{{ date }}</div>
</template>

<script>
import { format } from 'date-fns'
export default {
  data() {
    return {
      date: '',
    }
  },
  mounted() {
    this.getDate()
  },
  methods: {
    getDate() {
      this.date = format(new Date(), 'MMMM d, H:mm:ss')
      setTimeout(this.getDate, 1000)
    },
  },
}
</script>
