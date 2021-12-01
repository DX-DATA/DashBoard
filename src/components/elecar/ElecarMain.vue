<template>
    <div class="container-fluid">
        <article class="card grid-item">
            <h4>현재 사용중인 고소차</h4>
            <table class="table table-hover">
                <thead>
                    <th>
                        고소차 ID
                    </th>
                    <th>
                        사용부서
                    </th>
                    <th>
                        사용 시작 시간
                    </th>
                    <th>
                        사용 종료 시간
                    </th>
                </thead>
                    <tr>
                        <td>dtd</td>
                        <td>dtd</td>
                        <td>dtd</td>
                        <td>dtd</td>
                    </tr>
                    <tr>
                        <td>dtd</td>
                        <td>dtd</td>
                        <td>dtd</td>
                        <td>dtd</td>
                    </tr>
                    <tr>
                        <td>dtd</td>
                        <td>dtd</td>
                        <td>dtd</td>
                        <td>dtd</td>
                    </tr>                    
            </table>
        </article>
        <article class="card grid-item">
            <h4> 주간 고소차 사용량</h4>
            <table class="table table-hover">
                대충 그래프 들어있다는 내용
            </table>
        </article>
        <article id="location" class="card grid-item">
            <h4>실시간 고소차 위치</h4>
            <table class="table table-hover">
                카카오맵
            </table>
        </article>
    </div>
</template>


<script>

export default {
    components: {},
    setup() {       

    },
}
</script>


<style scoped>
.container-fluid {
    margin-top : 10px;
    display : grid;
    grid-template-columns: 1fr 2fr;

}

.grid-item {
    margin : 10px;
    padding : 5px;
}

#location {
    grid-column-start: 1;
	grid-column-end: 3;
}

@media (max-width: 768px) {
  .container-fluid {
    display: flex;
    flex-direction : column;
  }
}
</style>
