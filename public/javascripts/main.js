let mapOptions = {
      center: new naver.maps.LatLng(37.5666805, 126.9784147),
      zoom: 10
    };

let map = new naver.maps.Map('map', mapOptions);
    
$.ajax({
  url: "/location",
  type: "GET",
}).done((response) => {
  if (response.message !== "success") return;

    const data = response.data;
      let markerList=[];  //마커들을 담는 공간
      let infoWindowList=[]; //인포윈도우를 담는 공간
      let isOpenList=[]; // 인포윈도우 열렸는지 확인, boolean으로. 열려있으면 true
      let markerNumber=-1;
  
      for(let i in data){
        let target=data[i];
        let latlng=new naver.maps.LatLng(target.lat,target.lng);
        
        marker=new naver.maps.Marker({
          map:map,
          position: latlng,
          icon:{
            content: `<div class='marker-wrapper'><img class='marker' src=${target.markerImg}></img><span class="marker-emoji">❤️</span></div>`,
            anchor: new naver.maps.Point(12,12) //marker의 중심
          },
        });
        //map이라는 변수위에 마커가 표시, position은 마커가 표시될 위치,icon은 마커로 표시될 div
        
        let content=`<div class='infowindow_wrap' style='position:fixed; left:0px; bottom:0px;'>
          <div class='infowindow_content_wrap'>
            <div class='infowindow_image'>
              <img src="${target.img}" alt="맛집이미지">
            </div>
            <div class='infowindow_content'>
              <div class='infowindow_username'>${target.username}</div>
              <div class='infowindow_text'>${target.text}</div>
            </div>
          </div>  
          <div class='infowindow_feedback'>
          <span>${target.title}, 어땠나요?</span>
          <div class="emoji-list">
          <span>❤️</span>
          <span>👍</span>
          <span>🤔</span>
          </div>
          </div>
        </div>`
  
        let infowindow = {
          content: content,
        };
  
        markerList.push(marker);
        infoWindowList.push(infowindow);
        isOpenList.push('false');
      }
  
      for (let i =0, ii=markerList.length;i<ii;i++){
        naver.maps.Event.addListener(markerList[i],"click",getClickHandler(i)); //marker클릭했을때 이벤트
        naver.maps.Event.addListener(map,"click",clickMap(i)); //marker클릭했을때 이벤트
      };
  
    const infoWindowContainer = document.querySelector('#infowindow-container')

  //10개 이하일때는 클러스터 1 실행되도록
  const cluster1 = {
      content: `<div class="cluster1"></div>`,
  };
  const cluster2 = {
      content: `<div class="cluster2"></div>`,
  };
  const cluster3 = {
      content: `<div class="cluster3"></div>`,
  };
  
  const markerClustering = new MarkerClustering({
      minClusterSize: 2,
      maxZoom: 12,
      map: map,
      markers: markerList,
      disableClickZoom: false,
      gridSize: 20,
      icons: [cluster1, cluster2, cluster3],
      indexGenerator: [2, 5, 10],   //cluster가 실행되는 마커 개수 범위 설정
      stylingFunction: (clusterMarker, count) => {
          $(clusterMarker.getElement()).find("div:first-child").text(count);
      }
      //클러스터 안에 몇개의 마커가 들어있는지 표시해줌.
  })
   
  
  $('#current').click(() => {
    if('geolocation' in navigator){
          navigator.geolocation.getCurrentPosition(function(position){
            //위도, 경도 등이 담긴 Position 정보 활용
            const lat=position.coords.latitude;
            const lng=position.coords.longitude;
            const latlng=new naver.maps.LatLng(lat,lng);
            if(currentUse){
              marker=new naver.maps.Marker({
                map:map,
                position:latlng,
                icon: {
                  content: '<img class="pulse" draggable="false" unselectable="on" src="https://myfirstmap.s3.ap-northeast-2.amazonaws.com/circle.png">',
                  anchor: new naver.maps.Point(11,11),
                },
              });
              currentUse=false;
            }
            map.setZoom(14,false);
            //zoom레벨, 이동 애니메이션 여부
            map.panTo(latlng);
          });
        }else{
          //navigator안에 geolocation이 없다면 위치정보 사용 불가능
          alert('위치정보 사용 불가능');
        }
      });
  
      let ps=new kakao.maps.services.Places();
      let search_arr=[];
  
      $('#search_input').on("keydown",function(e){
        if(e.keyCode===13){
          //엔터키 눌렀을때
          let content=$(this).val();
          ps.keywordSearch(content, placeSearchCB);
          //content결과값이 placeSearchCB라는 함수를 통해서 처리됨.
        }
      });
      $('#search_button').on("click",function(e){
        let content=$("#search_input").val()
        ps.keywordSearch(content,placeSearchCB);
      })
  
      function placeSearchCB(data,status,pagination){
        //data에는 목적지를 바탕으로 검색한 결과,
        //status는 카카오 서버에 대한 상태
        //검색결과가 얼마나 있는지 번호를 통해 알수있음.
        if(status===kakao.maps.services.Status.OK){
          let target=data[0];
          const lat=target.y;
          const lng=target.x;
          const latlng=new naver.maps.LatLng(lat,lng);
          marker=new naver.maps.Marker({
            position: latlng,
            map:map
          });
          if(search_arr.length==0){
            search_arr.push(marker);
          }else{  //이미 마커가 있다면
            search_arr.push(marker);
            let pre_marker=search_arr.splice(0,1);
            //0번째 마커 추출
            pre_marker[0].setMap(null);
          }
          map.setZoom(14,false);
          map.panTo(latlng);
        }else{
          alert("검색결과가 없습니다.");
        }
      }

    function getClickHandler(i){
      return function () {
        let target=data[i]
        markerNumber=isOpenList.indexOf(true)
        if (markerNumber != -1) {
          let openedMarker = markerList[markerNumber]
          var icon = {
              content: `<div class='marker-wrapper'><img class='marker' src=${target.markerImg}></img><span class="marker-emoji">❤️</span></div>`
            } 
            openedMarker.setIcon(icon);
        }
        let marker=markerList[i];
        let infowindow=infoWindowList[i];
        if(isOpenList[i] === true) { 
          //infowindow가 표시되어있는지 확인
          infoWindowContainer.innerHTML = '';
          isOpenList[i] = false;
          var icon = {
              content: `<div class='marker-wrapper'><img class='marker' src=${target.markerImg}></img><span class="marker-emoji">❤️</span></div>`
          } 

            marker.setIcon(icon);
        }else{
          infoWindowContainer.innerHTML = infowindow.content;
          for (let i=0, ii=isOpenList.length; i<ii; i++){
            isOpenList[i] = false;
          }
          isOpenList[i] = true;
          
            var icon = {
              content: `<div class='marker-info-wrapper'><img class='marker' src=${target.markerImg}></img><div style='padding-left: 10px; width:max-content;'>${target.title}</div></div>`
            } 
            marker.setIcon(icon);
        }
      }
    }

    function clickMap(i){
      return function () {
        let marker = markerList[i];
        let target=data[i]
        infoWindowContainer.innerHTML = '';
        isOpenList[i] = false;
        var icon = {
              content: `<div class='marker-wrapper'><img class='marker' src=${target.markerImg}></img><span class="marker-emoji">❤️</span></div>`
            } 
            marker.setIcon(icon);
      }
    }
});

