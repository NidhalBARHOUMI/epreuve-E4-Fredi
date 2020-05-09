<template>
  <div>
    <el-input
      style="margin:5px "
      v-model="search"
      placeholder="Nom, Prénom ..."
      clearable
      @change="find(search)"
    ></el-input>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
      :default-sort="{prop: 'nom', order: 'descending'}"
    >
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column prop="nom" label="Nom" fit min-width="170" sortable></el-table-column>
      <el-table-column prop="prenom" label="Prenom" fit min-width="170" sortable></el-table-column>
      <el-table-column prop="sexe" label="Sexe" fit min-width="170" sortable>
        <template slot-scope="scope">
          <el-tag :type="scope.row.sexe == 1 ? '' : 'danger'" disable-transitions>
            <span v-if="scope.row.sexe == 1">Masculin</span>
            <span v-if="scope.row.sexe == 0">Féminin</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="Date" fit min-width="170" sortable></el-table-column>
      <el-table-column prop="email" label="Email" fit min-width="170" sortable></el-table-column>
      <el-table-column prop="adresse" label="Adresse" fit min-width="170" sortable></el-table-column>
      <el-table-column prop="ville" label="Ville" fit min-width="170" sortable></el-table-column>
      <el-table-column prop="num" label="Numéro" fit min-width="170" sortable></el-table-column>
      <el-table-column prop="codePostal" label="Code Postal" fit min-width="170" sortable></el-table-column>
      <el-table-column prop="ligueSportive" label="Ligue Sportive" fit min-width="170" sortable></el-table-column>
      <el-table-column fixed="right" label="Opérations" fit min-width="220">
        <template slot-scope="scope">
          <el-button @click="showFrais(scope.row._id)" type="danger" size="small">Frais</el-button>
          <el-button @click="sendFrais(scope.row._id)" size="small">Envoyer Cerfa</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="Les Frais" :visible.sync="dialogFormVisible">
      <div>
        <ListFrais :frais="frais" :key="dialogFormVisible"></ListFrais>
        <el-button style="margin:6px" type="info" @click="dialogFormVisible = false">Annuler</el-button>
      </div>
    </el-dialog>
    <el-dialog title="Envoyer Cerfa" :visible.sync="dialogFormVisible2" width="400px">
      <div>
        <SendCerfa :key="dialogFormVisible2" :adhId="adhId" :tot="tot"></SendCerfa>
        <el-button style="margin:6px" type="info" @click="dialogFormVisible2 = false">Annuler</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ListFrais from "@/components/ListFrais.vue";
import SendCerfa from "@/components/SendCerfa.vue";
import axios from "axios";
export default {
  data() {
    return {
      tot: "",
      adhId: "",
      frais: "",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      search: "",
      multipleSelection: [],
      tableData: ""
    };
  },
  components: { ListFrais, SendCerfa },
  methods: {
    find(search) {
      axios
        .post("http://localhost:8080/adherents/search", { q: this.search })
        .then(res => {
          console.log(res);
          this.tableData = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    sendFrais(id) {
      axios
        .get("http://localhost:8080/frais/userFraisTot/" + id)
        .then(res => {
          console.log(res);
          this.tot = res.data;
        })
        .catch(error => {
          console.log(error);
        });
      this.adhId = id;
      this.dialogFormVisible2 = true;
    },
    showFrais(id) {
      axios
        .get("http://localhost:8080/frais/userFrais/" + id)
        .then(res => {
          console.log(res);
          this.frais = res.data;
        })
        .catch(error => {
          console.log(error);
        });
      this.dialogFormVisible = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  beforeMount() {
    axios
      .get("http://localhost:8080/adherents")
      .then(res => {
        console.log(res);
        this.tableData = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>