<template>
  <div>
    <el-menu
      class="hsoumi-navbar"
      mode="horizontal"
      v-if="getIsAuthenticated.search('tresorier') != -1"
    >
      <el-menu-item>
        <img src="../assets/sport.jpg" width="50px">
      </el-menu-item>
      <el-menu-item>
        <router-link to="/ListAdherents">Lister des Adhèrents</router-link>
      </el-menu-item>
      <el-menu-item>
        <router-link to="/CreateAdherent">Ajouter un Adhèrents</router-link>
      </el-menu-item>
      <el-menu-item style="float:right" @click="disconnect">Déconnexion</el-menu-item>
    </el-menu>
    <el-menu
      class="hsoumi-navbar"
      mode="horizontal"
      v-if="getIsAuthenticated.search('adherent') != -1"
    >
      <el-menu-item>
        <img src="../assets/sport.jpg" width="50px">
      </el-menu-item>
      <el-menu-item>
        <router-link to="/AddFrais">Ajouter Frais</router-link>
      </el-menu-item>
      <el-menu-item>
        <router-link to="/getCerfa">Afficher les Cerfa(s)</router-link>
      </el-menu-item>
      <el-menu-item style="float:right" @click="disconnect">Déconnexion</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      disconnect: "store/disconnect"
    })
  },
  computed: {
    ...mapGetters({
      getIsAuthenticated: "store/getIsAuthenticated"
    })
  }
};
</script><style scoped>
a {
  text-decoration: none;
}
</style>