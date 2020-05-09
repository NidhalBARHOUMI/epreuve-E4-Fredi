 <template>
  <div class="container">
    <div class="formContainer">
      <el-form ref="form" label-position="left" :model="form" :rules="rules">
        <p>Connexion</p>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" type="email" clearable/>
        </el-form-item>
        <el-form-item label="Mot de passe" prop="mdp">
          <el-input v-model="form.mdp" clearable/>
        </el-form-item>
        <el-form-item label="Connecter en tant que :">
          <el-switch
            v-model="form.type"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="Adhèrent"
            inactive-text="Trésorier"
          ></el-switch>
        </el-form-item>
        <el-button class="submit" type="success" @click="signin('form')">Se Connecter</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      type: "",
      form: { email: "", mdp: "", type: false },
      rules: {
        mdp: 
          [{
            required: true,
            message: "Mot de passe requis"
          }],
      
        
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
    pushF(callback) {
      this.$router.push("/");
      console.log("push");
      callback();
    },
    reload() {
      setTimeout(function() {
        location.reload();
      }, 500);
    },
    signin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.type === false) {
            console.log("trésorier");
            axios
              .post("http://localhost:8080/tresoriers/signin", {
                email: this.form.email,
                password: this.form.mdp
              })
              .then(res => {
                console.log(res);
                if (res.status == 200) {
                  this.$message({
                    showClose: true,
                    message: "Bienvenu",
                    type: "success"
                  });
                  localStorage.token = "tresorier " + res.data.tresoriers._id;
                  this.pushF(this.reload);
                }
              })
              .catch(err => {
                if (err.toString().search("401") != -1) {
                  this.$message({
                    showClose: true,
                    message: "Email ou Mot de passe incorrect",
                    type: "error"
                  });
                }
              });
          }
          if (this.form.type === true) {
            console.log("adhérent");
            axios
              .post("http://localhost:8080/adherents/signin", {
                email: this.form.email,
                password: this.form.mdp
              })
              .then(res => {
                if (res.status == 200) {
                  this.$message({
                    showClose: true,
                    message: "Bienvenu",
                    type: "success"
                  });
                  localStorage.token = "adherent " + res.data.adherents._id;
                  this.pushF(this.reload);
                }
              })
              .catch(err => {
                if (err.toString().search("401") != -1) {
                  this.$message({
                    showClose: true,
                    message: "Email ou Mot de passe incorrect",
                    type: "error"
                  });
                }
              });
          }
        } else {
          console.log("Erreur Connection");
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

