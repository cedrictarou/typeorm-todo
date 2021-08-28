<template>
  <v-list-item
    :class="{ 'blue darken-4': todo.isDone }"
    @click.stop="openEditDialog()"
  >
    <template #default="">
      <v-list-item-action>
        <v-checkbox
          :input-value="todo.isDone"
          @click.stop="doneTodo(todo)"
        ></v-checkbox>
      </v-list-item-action>

      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-list-item-content v-bind="attrs" v-on="on">
            <v-list-item-title :class="{ isDone: todo.isDone }">{{
              todo.text
            }}</v-list-item-title>
            <edit-dialog
              v-if="dialog.edit"
              :todo="todo"
              @close="dialog.edit = false"
            />
          </v-list-item-content>
        </template>
        <span>Click to Edit.</span>
      </v-tooltip>

      <delete-dialog
        v-if="dialog.delete"
        :todo="todo"
        @close="dialog.delete = false"
      />
      <v-list-item-action>
        <v-icon @click.stop="openDeleteDialog"
          >mdi-delete-empty-outline
        </v-icon>
      </v-list-item-action>
    </template>
  </v-list-item>
</template>

<script>
import DeleteDialog from './dialog/DeleteDialog.vue'
import EditDialog from './dialog/EditDialog.vue'
export default {
  components: { EditDialog, DeleteDialog },
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: {
        edit: false,
        delete: false,
      },
    }
  },
  methods: {
    doneTodo(todo) {
      const targetTodo = {
        id: todo.id,
        text: todo.text,
        isDone: !todo.isDone,
      }
      this.$store.dispatch('editTodo', targetTodo)
    },
    openEditDialog() {
      this.dialog.edit = true
    },
    openDeleteDialog() {
      this.dialog.delete = true
    },
  },
}
</script>
<style lang="scss">
.isDone {
  text-decoration-line: line-through;
}
</style>
