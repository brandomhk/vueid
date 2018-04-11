<template>
  <v-container class="white" fluid>
    <h2 class="blue--text">
      List user <v-btn @click="getAllUsers()" class="blue white--text">reload</v-btn>
    </h2>
    <br />
    <v-data-table
    :headers="headers"
    :items="allUser"
    :loading="isLoading"
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
import Modal from './Modal.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'dev-vuex',
  data () {
    return {
      headers: [
      { text: 'Name', align: 'left', 'sortable': false },
      { text: 'E-mail', value: 'email', 'sortable': false },
      { text: 'Phone', value: 'phone', 'sortable': false },
      { text: 'Actions', value: 'actions', 'sortable': false }
      ],
      users: [],
      dialog: false,
      message: ''
    }
  },
  computed: {
    // init data table
    allUser: function () {
      if (this.getColectionUsers == 'loading')
        return []
      else
        return this.getColectionUsers
    },
    ...mapGetters({
      getColectionUsers: 'users/getColectionUsers',
      isLoading: 'users/isLoading'
    })
  },
  methods: {
    hideDialog () {
      this.dialog = false
    }
  },
  components: {
    modal: Modal
  }
}
</script>