<template>
  <v-app>
    <!-- nav -->
    <v-navigation-drawer permanent absolute v-model="drawer" app>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://imageshack.com/a/img922/6091/i5nFAN.png" >
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Vueid <span style="color: red">dev</span></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in itemsNav" :key="item.title" @click="">
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link :to="item.router" style="text-decoration: none">
                <h3><v-icon>{{ item.icon }}</v-icon> {{ item.title }}</h3>
              </router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!-- end nav -->
    <v-content
    class="primary"
    style="padding-left: 21.9em; padding-right: 0.5em; padding-top: 0.5em; padding-bottom: 3em">
    <v-container fluid class="white" style="margin-bottom: 0.5em">
      <h2 class="blue--text">Add users</h2>
      <form>
        <v-layout row wrap>
          <v-flex xs4 sm4 lg4>
            <v-text-field
            v-model="name"
            label="Name"
            data-vv-name="name"
            class="white--text"
            required
            ></v-text-field>
          </v-flex>
          <v-flex xs4 sm4 lg4>
            <v-text-field
            v-model="email"
            label="E-mail"
            data-vv-name="email"
            required
            ></v-text-field>
          </v-flex>
          <v-flex xs4 sm4 lg4>
            <v-text-field
            v-model="phone"
            label="Phone"
            data-vv-name="phone"
            required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn @click="submit" class="blue white--text">add</v-btn>
        <v-btn @click="clear" class="red white--text">clear</v-btn>
      </form>
      <!-- modal alert -->
      <modal :message="message" :dialog="dialog" @hideDialog="hideDialog"></modal>
      <!-- end modal alert -->
    </v-container>
    <!-- router VIEWS-->
    <router-view></router-view>
    <!-- end router VIEWS-->
  </v-content>
  <v-footer class="grey darken-3" app>
    <v-layout row wrap justify-center>
      <v-flex xs12 md12 lg12 py-3 text-xs-center white--text>
        Developed by — <strong>Brandom Bermudez</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</v-app>
</template>

<script>
import Modal from './components/Modal.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      drawer: true,
      itemsNav: [
      { title: 'Documentation', icon: 'dashboard', router: {name: 'index'}},
      { title: 'Dev', icon: 'build', router: {name: 'dev'}},
      { title: 'Dev with vuex', icon: 'build', router: {name: 'dev-vuex'}}
      ],
      right: null,
      // form
      name: '',
      email: '',
      phone: '',
      dialog: false,
      message: '',
      items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4'
      ],
      dictionary: {
        attributes: {
          email: 'E-mail Address'
          // custom attributes
        },
        custom: {
          name: {
            required: () => 'Name can not be empty',
            max: 'The name field may not be greater than 10 characters'
            // custom messages
          },
          select: {
            required: 'Select field is required'
          }
        }
      }
    }
  },
  methods: {
    submit () {
      this.$vd.users.put({
        name: this.name,
        email: this.email,
        phone: this.phone
      }).then((result) => {
        this.dialog = true
        this.message = 'Added user'
        // clear form
        this.clear()
        // mupdate colection with mutation
        this.updateColection(this.$vd)
      }).catch((error) => {
        this.dialog = true
        this.message = error
      })
    },
    clear () {
      this.name = ''
      this.email = ''
      this.phone = ''
    },
    hideDialog () {
      this.dialog = false
    },
    ...mapMutations({
      // update colection
      updateColection: 'users/updateColection'
    })
  },
  components: {
    modal: Modal
  }
}
</script>