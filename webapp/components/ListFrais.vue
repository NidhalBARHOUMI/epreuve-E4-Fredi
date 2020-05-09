<template>
  <div>
    <div v-if="frais.length">
      <div v-for="(f,i) in frais" :key="i">
        <el-form>
          <label>Date</label>
          <el-form-item :label="f.date"></el-form-item>
          <label>Hébérgement</label>
          <el-form-item :label="f.hbg">
            <el-switch
              v-model="f.hbgV"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="Yes"
              inactive-text="No"
            ></el-switch>
          </el-form-item>
          <label>KM</label>
          <el-form-item :label="f.km">
            <el-switch
              v-model="f.kmV"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="Yes"
              inactive-text="No"
            ></el-switch>
          </el-form-item>
          <label>Trajet</label>
          <el-form-item :label="f.trajet">
            <el-switch
              v-model="f.trajetV"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="Yes"
              inactive-text="No"
            ></el-switch>
          </el-form-item>
          {{f.trajetV +" "+ f.repasV}}
          <label>Repas</label>
          <el-form-item :label="f.repas">
            <el-switch
              v-model="f.repasV"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="Yes"
              inactive-text="No"
            ></el-switch>
          </el-form-item>
          <label>Péage</label>
          <el-form-item :label="f.peage">
            <el-switch
              v-model="f.peageV"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="Yes"
              inactive-text="No"
            ></el-switch>
          </el-form-item>
        </el-form>
        <el-button type="success" style="margin:10px auto;display:block" @click="update(f)">Edit</el-button>
      </div>
    </div>
    <div v-else style="padding:30px 0 50px 0;font-size:50px">0 FRAIS</div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["frais"],
  methods: {
    update(f) {
      axios
        .put("http://localhost:8080/frais/" + f._id, {
          hbgV: f.hbgV.toString(),
          kmV: f.kmV.toString(),
          trajetV: f.trajetV.toString(),
          repasV: f.repasV.toString(),
          peageV: f.peageV.toString()
        })
        .then(res => {
          console.log(res);
          this.$message({
            showClose: true,
            message: "Frais mis à jour",
            type: "success"
          });
        })
        .catch(error => {
          this.$message({
            showClose: true,
            message: "Erreur",
            type: "success"
          });
        });
    }
  }
};
</script>
<style scoped>
.el-switch {
  float: right;
}
</style>
