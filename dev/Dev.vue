<template>
  <v-container class="white" fluid>
    <h2 class="blue--text">
      List user <v-btn @click="getAllUsers()" class="blue white--text">reload</v-btn>
    </h2>
    <br />
    <v-data-table
    :headers="headers"
    :items="users"
    :loading="loading"
    :align="'center'"
    class="elevation-1"
    >
    <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.email }}</td>
      <td>{{ props.item.phone }}</td>
      <td><v-btn @click="deleteUser(props.item.id)" class="red white--text"><v-icon>delete_forever</v-icon></v-btn></td>
    </template>
  </v-data-table>
  <!-- modal alert -->
  <modal :message="message" :dialog="dialog" @hideDialog="hideDialog"></modal>
  <!-- end modal alert -->
</v-container>
</template>
<script>
import Modal from './components/Modal.vue'
export default {
  name: 'app',
  data () {
    return {
      headers: [
      { text: 'Name', align: 'left', 'sortable': false },
      { text: 'E-mail', value: 'email', 'sortable': false },
      { text: 'Phone', value: 'phone', 'sortable': false },
      { text: 'Actions', value: 'actions', 'sortable': false }
      ],
      users: [],
      loading: true,
      dialog: false,
      message: ''
    }
  },
  mounted () {
    this.getAllUsers()
    this.message = 'ja'
  },
  methods: {
    getAllUsers: function () {
      this.loading = true

      this.$vd.users.toArray().then((result) => {
        this.users = result
        this.loading = false
      })
    },
    deleteUser: function (id) {
      this.$vd.users.delete(id).then((result) => {
        this.message = 'Delete!'
        this.dialog = true
        this.getAllUsers()
      }).catch((error) => {
        this.message = error
        this.dialog = true
      })
    },
    hideDialog () {
      this.dialog = false
    }
  },
  components: {
    modal: Modal
  }
}
</script>