<template>
  <div class="hello">
    <table>
      <tr>
        <th>
          크레인 ID
        </th>
        <th>
          사용여부
        </th>
        <th>
          사용시작 시간
        </th>
        <th>
          사용종료 시간
        </th>
        <th>
          경도	
        </th>
        <th>
          위도
        </th>
        <th>
          사용부서  
        </th>
        <th>
          최종 업데이트 시간
        </th>
      </tr>
      <tr v-for="data in datas" v-bind:key="data.crane_id" v-on:click="viewMap(data)"> 
        <td v-for="ele in data" v-bind:key="ele">
            {{ele}}
        </td>
      </tr>
    </table>


    <KakaoMap :options="mapOption" :key="mapOption.center.lat"/>
  </div>
</template>

<script>
import axios from 'axios'
import KakaoMap from '../modules/KakaoMap.vue';
import io from 'socket.io/client-dist/socket.io'
import api from '../../api/api'
let socket = io('http://127.0.0.1:3333')

export default {
  components: { KakaoMap },
  name: 'CraneList',
  created() {
    this.getData();    
  },
  mounted() {
    //socket

    socket.on('index', function(data) {
      console.log(data);
    });

    let setData = (data) => {
        for(let i = 0; i < this.datas.length; i++) {
          if(this.datas[i].crane_id === data[0]) {
            this.datas[i].crane_id = data[0];
            this.datas[i].cur_gps_lon = data[2];
            this.datas[i].cur_gps_lat = data[3];
            this.datas[i].last_timestamp = data[1]
          }
      }
    }

    socket.on('new', function(data) {
      console.log(data);
      setData(data);
    });
  },
  unmounted() {
    socket.disconnect();
  },
  props: {
    msg: String
  },
  data() {
    return{
      datas : '',
      map : null,
      markers : [],
      mapOption : {
        center : {
          lat : 33.450701,
          lng : 126.570667,
        },
        level : 6,
      }
    }
  },
  methods : {
    getData : async function() {
      await axios.get('/api/crane/current', {headers : {
        Authorization: 'Bearer ' + api.getCookie('auth'), 
      }}).then(response => {
        console.log(response)
        this.datas = response.data
      }).catch(err => {
        console.log(err)
      }); 
    },
    viewMap : function(data) {
      console.log(data.crane_id);
      
      this.mapOption.center.lat = data.cur_gps_lat;
      this.mapOption.center.lng = data.cur_gps_lon;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  border-collapse: collapse;
  border: 1px solid black;
} 

td { 
  -webkit-animation: blink-2 0.8s ease-in both;
  animation: blink-2 0.8s ease-in both;
  border : 1px solid #eeeeee;
  padding : 5px
}

th {
  padding : 5px;
  border : 1px solid #eeeeee;

}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.blink-2 {
	-webkit-animation: blink-2 0.8s ease-in both;
  animation: blink-2 0.8s ease-in both;
}

@-webkit-keyframes blink-2 {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
@keyframes blink-2 {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
</style>
