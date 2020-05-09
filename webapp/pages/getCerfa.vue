<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%" border>
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column prop="cerfa" label="Cerfa" fit min-width="170" sortable></el-table-column>
      <el-table-column prop="tresoriers" label="Tresoriers" fit min-width="170" sortable></el-table-column>
      <el-table-column fixed="right" label="Opérations" fit min-width="220">
        <template slot-scope="scope">
          <el-button type="success">
            <a :href="'http://localhost:8080/uploads/'+scope.row.cerfa" download>Télecharger</a>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tableData: ""
    };
  },
  beforeMount() {
    axios
      .get(
        "http://localhost:8080/cerfa/" + this.getIsAuthenticated.split(" ")[1]
      )
      .then(res => {
        console.log(res);
        this.tableData = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
    ...mapGetters({
      getIsAuthenticated: "store/getIsAuthenticated"
    })
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
