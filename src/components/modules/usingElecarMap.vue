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
      markerPosition: [
        [37.499590490909185, 127.0263723554437],
        [37.499427948430814, 127.02794423197847],
        [37.498553760499505, 127.02882598822454],
        [37.497625593121384, 127.02935713582038],
        [37.49629291770947, 127.02587362608637],
        [37.49754540521486, 127.02546694890695],
        [37.49646391248451, 127.02675574250912],
      ],
      markers: [],
    };
  },
  mounted() {
    this.initMap();
    this.displayMarker();
  },
  methods: {
    initMap() {
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
      //   console.log(usingElecar);

      let elecarID = [];
      const positions = usingElecar.map((position) => {
        elecarID.push(position.eqp_id);
        let latlng = [position.current_gps_lat, position.current_gps_lon];
        return new this.kakao.maps.LatLng(...latlng);
      });
      if (positions.length > 0) {
        // this.markers = positions.map(
        //   (position) =>
        //     new this.kakao.maps.Marker({
        //       map: this.map,
        //       position,
        //     })
        // );

        for (let i = 0; i < positions.length; i++) {
          var marker = new this.kakao.maps.Marker({
            map: this.map, // 마커를 표시할 지도
            position: positions[i], // 마커의 위치
          });

          // 마커에 표시할 인포윈도우를 생성합니다
          var infowindow = new this.kakao.maps.CustomOverlay({
            content: `<div style="background:#fff; position:relative; bottom:55px; padding:2px; text-align:center; border: 1px solid black; font-size: 12px" >${elecarID[i]}</div>`, // 인포윈도우에 표시할 내용
            map: this.map,
            position: marker.getPosition(),
          });

          infowindow.setMap(this.map);
        }
      }

      //   console.log(positions);

      const bounds = positions.reduce(
        (bounds, latlng) => bounds.extend(latlng),
        new this.kakao.maps.LatLngBounds()
      );

      this.map.setBounds(bounds);
    },
    // makeOverListener(map, marker, infowindow) {
    //   return function () {
    //     infowindow.open(map, marker);
    //   };
    // },
    // makeOutListener(infowindow) {
    //   return function () {
    //     infowindow.close();
    //   };
    // },
  },
};
</script>

<style scoped>
#map {
  width: 90%;
  height: 400px;
}
</style>
