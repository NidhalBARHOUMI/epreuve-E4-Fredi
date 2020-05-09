<template>
  <div class="container">
    <div class="formContainer">
      <el-form ref="form" label-position="left" :model="form">
        <p>Creation d'un Adhèrent</p>
        <el-form-item label="Nom">
          <el-input v-model="form.nom" clearable/>
        </el-form-item>
        <el-form-item label="Prénom">
          <el-input v-model="form.prenom" clearable/>
        </el-form-item>
        <el-form-item label="Sexe">
          <el-radio-group v-model="form.sexe">
            <el-radio
              :label="1"
              style="margin-bottom:3px;width:115px"
              border
              size="medium"
              v-model="form.sexe"
            >Masculin</el-radio>
            <el-radio
              :label="0"
              style="margin:0;width:115px"
              border
              v-model="form.sexe"
              size="medium"
            >Féminin</el-radio>
          </el-radio-group>
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
        <el-form-item label="Address">
          <el-input v-model="form.adresse" clearable/>
        </el-form-item>
        <el-form-item label="Ville">
          <el-input v-model="form.ville" clearable/>
        </el-form-item>
        <el-form-item label="Code Postal">
          <el-input v-model="form.codePostal" clearable/>
        </el-form-item>
        <el-form-item label="Num">
          <el-input v-model="form.num" clearable/>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.email" clearable/>
        </el-form-item>
        <el-form-item label="Mot de Passe">
          <el-input v-model="form.motdePasse" clearable/>
        </el-form-item>
        <el-form-item label="Ligue Sportive">
          <el-select v-model="form.ligueSportive" placeholder="Séléctionner" style="width:100%">
            <el-option
              v-for="item in ligues"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button class="submit" type="success" @click="create">Ajouter</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      ligues: [],
      form: {
        nom: "",
        prenom: "",
        sexe: "",
        date: "",
        adresse: "",
        ville: "",
        codePostal: "",
        num: "",
        email: "",
        motdePasse: "",
        ligueSportive: ""
      },
      rules: []
    };
  },
  methods: {
    create() {
      axios
        .post("http://localhost:8080/adherents/signup", {
          nom: this.form.nom,
          prenom: this.form.prenom,
          sexe: this.form.sexe,
          date: new Date(this.form.date),
          adresse: this.form.adresse,
          ville: this.form.ville,
          codePostal: this.form.codePostal,
          num: this.form.num,
          email: this.form.email,
          password: this.form.motdePasse,
          ligueSportive: this.form.ligueSportive
        })
        .then(res => {
          console.log(res);
          if (res.status == 201) {
            this.$message({
              showClose: true,
              message: "Adhèrent Ajouté",
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
  beforeMount() {
    axios
      .get("http://localhost:8080/ligueSportive")
      .then(res => {
        res.data.map(ligue => {
          this.ligues.push({ value: ligue._id, label: ligue.nom });
        });
      })
      .catch(err => {});
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

