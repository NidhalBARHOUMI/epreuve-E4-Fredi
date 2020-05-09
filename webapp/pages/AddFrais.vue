<template>
  <div class="container">
    <div class="formContainer">
      <el-form ref="form" label-position="left" :model="form">
        <p>Creation d'un Frais</p>
        <el-form-item label="Hébérgement">
          <el-input v-model="form.Hébérgement" clearable/>
        </el-form-item>
        <el-form-item label="KM">
          <el-input v-model="form.KM" clearable type="number"/>
        </el-form-item>
        <el-form-item label="Trajet">
          <el-input v-model="form.Trajet" clearable/>
        </el-form-item>
        <el-form-item label="Date">
          <el-date-picker
            :clearable="true"
            v-model="form.date"
            type="date"
            format="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="Repas">
          <el-input v-model="form.Repas" clearable/>
        </el-form-item>
        <el-form-item label="Péage">
          <el-input v-model="form.Péage" clearable/>
        </el-form-item>
        <el-button class="submit" type="success" @click="create">Ajouter</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        Hébérgement: "",
        KM: "",
        Trajet: "",
        date: "",
        Repas: "",
        Péage: ""
      },
      rules: []
    };
  },
  methods: {
    create() {
      axios
        .post("http://localhost:8080/frais", {
          adherents: this.getIsAuthenticated.split(" ")[1],
          hbg: this.form.Hébérgement,
          km: this.form.KM,
          trajet: this.form.Trajet,
          date: new Date(this.form.date),
          repas: this.form.Repas,
          peage: this.form.Péage
        })
        .then(res => {
          console.log(res);
          if (res.status == 201) {
            this.$message({
              showClose: true,
              message: "Frais Ajouté",
              type: "success"
            });
          }
        })
        .catch(err => {
          if (err.toString().search("500") != -1) {
            this.$message({
              showClose: true,
              message: "Erreur",
              type: "error"
            });
          }
        });
    }
  },
  computed: {
    ...mapGetters({
      getIsAuthenticated: "store/getIsAuthenticated"
    })
  }
};
</script>
<style scoped>
p {
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  padding: 30px;
}
.formContainer {
  max-width: 600px;
  padding: 20px;
  margin: 0 auto;
}
.submit {
  float: right;
  margin: 20px 0;
}
</style>

