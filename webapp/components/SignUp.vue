<template>
  <div class="container">
    <div class="formContainer">
      <el-form ref="form" label-position="left" :model="form" :rules="rules">
        <p>Inscription Trésorier</p>
        <el-form-item label="Nom" prop="nom">
          <el-input v-model="form.nom" clearable/>
        </el-form-item>
        <el-form-item label="Prénom" prop="prenom">
          <el-input v-model="form.prenom" clearable/>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" type="email" clearable/>
        </el-form-item>
        <el-form-item label="Numéro" prop="num">
          <el-input v-model="form.num" type="number" clearable/>
        </el-form-item>
        <el-form-item label="Mot de passe" prop="mdp">
          <el-input v-model="form.mdp" clearable/>
        </el-form-item>
        <el-button class="submit" type="success" @click="subscribe('form')">S'inscrire</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      form: { nom: "", prenom: "", email: "", num: "", mdp: "" },
      rules: {
        mdp: [
          {
            required: true,
            message: "MOT DE PASSE REQUIS"
          },
          {
            min: 8,
            max: 20,
            message: "LONGUEUR MINIMUM 8"
          }
        ],
        num: [
          {
            required: true,
            message: "nombre est requis"
          }
        ],
        nom: [
          {
            required: true,
            message: "nom est requis"
          }
        ],
        prenom: [
          {
            required: true,
            message: "prénom est requis"
          }
        ],
        email: [
          {
            required: true,
            message: "email est requis"
          },
          {
            type: "email",
            message: "type de email non valide"
          }
        ]
      }
    };
  },
  methods: {
    subscribe(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post("http://localhost:8080/tresoriers/signup", {
              nom: this.form.nom,
              prenom: this.form.prenom,
              num: this.form.num,
              email: this.form.email,
              password: this.form.mdp
            })
            .then(res => {
              console.log(res);
              if (res.status == 201) {
                this.$message({
                  showClose: true,
                  message: "vous êtes abonné maintenant",
                  type: "success"
                });
              }
            })
            .catch(err => {
              if (err.toString().search("409") != -1) {
                this.$message({
                  showClose: true,
                  message: "EMAIL DÉJÀ UTILISÉE",
                  type: "error"
                });
              }
            });
        } else {
          console.log("erreur valid");
        }
      });
    }
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
  line-height: 30px;
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
/* .container {
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  position: relative;
} */
</style>

