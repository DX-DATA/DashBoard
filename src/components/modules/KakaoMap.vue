<template>
  <div id="map" ref="map"></div>
</template>

<script>
export default {
  props: ['options', 'positions'],
  mounted() {
    //console.log(this.positions.gps_lat);

    let kakao = window.kakao;

    const { center, level } = this.options;

    console.log(this.positions);
    let container = this.$refs.map;
    let options = {
      center: new kakao.maps.LatLng(34.87365, 128.7037),
      level: level,
    };

    const map = new kakao.maps.Map(container, options);
    const icon = new kakao.maps.MarkerImage(
      'http://192.168.0.21:3333/images/redcircle.png',
      new kakao.maps.Size(5, 5)
    );

    //마커들의 대한 정보를 생성합니다
    let position = [];
    let linePath = [];
    if (this.positions != undefined) {
      for (let i = 0; i < this.positions.length; i += 3) {
        position.push({
          title: this.positions[i].use_timestamp,
          content:
            "<div class='kakao_map_tooltip' style='box-sizing: content-box; font-size=12px'>" +
            this.positions[i].use_timestamp +
            '</div>',
          latlng: new kakao.maps.LatLng(
            this.positions[i].gps_lat,
            this.positions[i].gps_lon
          ),
        });
        linePath.unshift(
          new kakao.maps.LatLng(
            this.positions[i].gps_lat,
            this.positions[i].gps_lon
          )
        );
      }
    } else {
      position.push({
        latlng: new kakao.maps.LatLng(center.lat, center.lng),
      });
    }

    //마커를 지도에 생성합니다
    for (let i = 0; i < position.length; i++) {
      let marker = new kakao.maps.Marker({
        map: map,
        title: position[i].title,
        position: position[i].latlng,
        image: icon,
      });

      marker.setMap(map);

      // 마커에 표시할 인포윈도우를 생성합니다
      let infowindow = new kakao.maps.InfoWindow({
        content: position[i].content, // 인포윈도우에 표시할 내용
      });

      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다
      // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      kakao.maps.event.addListener(
        marker,
        'mouseover',
        makeOverListener(map, marker, infowindow)
      );
      kakao.maps.event.addListener(
        marker,
        'mouseout',
        makeOutListener(infowindow)
      );
    }

    // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
    function makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    }

    // 인포윈도우를 닫는 클로저를 만드는 함수입니다
    function makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    }

    //Line을 생성합니다.
    let polyline = new kakao.maps.Polyline({
      path: linePath, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 3, // 선의 두께 입니다
      strokeColor: '#0067A3', // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'solid', // 선의 스타일입니다
      endArrow: true,
    });

    polyline.setMap(map);
  },
};
</script>

<style scoped>
#map {
  width: 500px;
  height: 500px;
}
*,
::after,
::before {
  box-sizing: content-box !important;
}
.kakao_map_tooltip {
  padding: 0px;
  font-size: 12px;
  box-sizing: content-box !important;
}

.kakao_map_tooltip::before,
.kakao_map_tooltip::after {
  box-sizing: content-box !important;
}
</style>
