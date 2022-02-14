<template>
  <div id="map" ref="map"></div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'usingElecarMap',
  data() {
    return {
      kakao: window.kakao,
      map: null,
      markers: [],
      infowindows: [],
    };
  },
  props: {
    routeData: Object,
  },
  watch: {
    routeData: {
      deep: true,
      async handler() {
        await this.removeMarker();
        this.displayMarker();
      },
    },
  },
  mounted() {
    this.initMap();
    this.displayMarker();
  },
  methods: {
    async initMap() {
      const container = this.$refs.map;
      const options = {
        center: new this.kakao.maps.LatLng(34.87365, 128.7037),
        level: 3,
      };
      this.map = new this.kakao.maps.Map(container, options);
    },
    async displayMarker() {
      const usingElecar = await axios
        .get('http://api.dxdata.co.kr:3333/elecar/usinglocation')
        .then((res) => res.data);

      let elecarID = [];
      const positions = usingElecar.map((position) => {
        elecarID.push(position.eqp_id);
        let latlng = [position.current_gps_lat, position.current_gps_lon];
        return new this.kakao.maps.LatLng(...latlng);
      });

      if (positions.length > 0) {
        for (let i = 0; i < positions.length; i++) {
          var marker = new this.kakao.maps.Marker({
            map: this.map, // 마커를 표시할 지도
            position: positions[i], // 마커의 위치
          });

          // 마커에 표시할 인포윈도우를 생성합니다
          let infowindow = new this.kakao.maps.CustomOverlay({
            content: `<div style="background:#fff; position:relative; bottom:55px; padding:2px; text-align:center; border: 1px solid black; font-size: 12px" >${elecarID[i]}</div>`, // 인포윈도우에 표시할 내용
            map: this.map,
            position: marker.getPosition(),
          });
          marker.setMap(this.map);
          infowindow.setMap(this.map);

          this.markers.push(marker);
          this.infowindows.push(infowindow);
        }
      }

      const bounds = positions.reduce(
        (bounds, latlng) => bounds.extend(latlng),
        new this.kakao.maps.LatLngBounds()
      );

      this.map.setBounds(bounds);
    },
    async removeMarker() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
        this.infowindows[i].setMap(null);
      }
      this.markers = [];
      this.infowindows = [];
    },
  },
};
</script>

<style scoped>
#map {
  height: 400px;
}
</style>
