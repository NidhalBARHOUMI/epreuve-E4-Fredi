<template>
  <div>
    <p>Frais Total: {{tot}}</p>
    <a href="http://localhost:8080/uploads/Recu_Fiscal_pdf_Editable.pdf" download>
      <el-button type="success" style="display:block;margin:10px auto">Télécharger</el-button>
    </a>
    <el-upload drag action :on-change="handleChange" :file-list="fileList" :limit="1">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        Déposer le fichier ici ou
        <em>cliquez pour télécharger</em>
      </div>
    </el-upload>
    <el-button style="display:block;margin:10px auto" @click="send">Envoyer</el-button>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  props: ["adhId", "tot"],
  data() {
    return {
      fileList: []
    };
  },
  computed: {
    ...mapGetters({
      getIsAuthenticated: "store/getIsAuthenticated"
    })
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    send() {
      let formData = new FormData();
      formData.append("tresoriers", this.getIsAuthenticated.split(" ")[1]);
      formData.append("cerfa", this.fileList[0].raw);
      formData.append("adherents", this.adhId);
      axios
        .post("http://localhost:8080/cerfa", formData)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
