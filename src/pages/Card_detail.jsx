import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Card_detail.css";

function CardDetail() {
  let { plantId } = useParams();

  // 식물 정보 상태
  const [plant, setPlant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 식물 데이터를 가져오는 함수
  useEffect(() => {
    // 가상의 API URL. 실제 URL로 대체 필요
    const url = `https://api.example.com/plants?plantId=${plantId}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPlant(data.plants[plantId]);
        console.log(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Fetching error:", error);
        setError(error);
        setIsLoading(false);
      });
  }, [plantId]); // plantId이 변경될 때마다 이 effect를 다시 실행

  // 로딩 중 메시지
  if (isLoading) return <div className="card_detail_wrap">로딩 중...</div>;

  // 에러 메시지
  if (error)
    return (
      <div className="card_detail_wrap">
        에러가 발생했습니다: {error.message}
      </div>
    );

  // 식물 정보 렌더링
  return (
    <div className="card_detail_wrap">
      <div className="card_detail">
        {plant ? (
          <div className="card_detail_plant">
            <div className="card_detail_plant_wrap">
              <h2 className="card_detail_plant_name">{plant.name}</h2>
            </div>
            <div className="card_detail_plant_back_color">
              {/* top */}
              <div className="card_detail_plant_top">
                <div className="card_detail_plant_img_wrap">
                  <img
                    className="card_detail_plant_img"
                    src={plant.imgUrl}
                    alt={plant.name}
                  />
                  <div className="card_detail_plant_sub">
                    <p>#{plant.type}</p>
                    <p>#{plant.level}</p>
                  </div>
                </div>
                <div className="card_detail_plant_intro_wrap">
                  <h3 className="card_detail_plant_intro_title">식물 소개</h3>
                  <p className="card_detail_plant_intro_explain">
                    {plant.explain}
                  </p>
                </div>
              </div>
              {/* bottom */}
              <div className="card_detail_plant_bottom">
                <div className="card_detail_plant_bottom_inner">
                  <div className="card_detail_plant_info">
                    <div className="card_detail_plant_span_wrap">
                      <p className="card_detail_plant_info_title">
                        물 주는 방법
                      </p>
                      <span className="card_detail_plant_info_span"></span>
                    </div>
                    <p className="card_detail_plant_info_sub"> {plant.water}</p>
                  </div>
                  <div className="card_detail_plant_info">
                    <div className="card_detail_plant_span_wrap">
                      <p className="card_detail_plant_info_title">온도 </p>
                      <span className="card_detail_plant_info_span"></span>
                    </div>
                    <p className="card_detail_plant_info_sub">
                      {plant.temperature}°C
                    </p>
                  </div>
                  <div className="card_detail_plant_info">
                    <div className="card_detail_plant_span_wrap">
                      <p className="card_detail_plant_info_title">흙 종류</p>
                      <span className="card_detail_plant_info_span"></span>
                    </div>
                    <p className="card_detail_plant_info_sub">{plant.soil}</p>
                  </div>
                  <div className="card_detail_plant_info">
                    <div className="card_detail_plant_span_wrap">
                      <p className="card_detail_plant_info_title">햇빛 </p>
                      <span className="card_detail_plant_info_span"></span>
                    </div>
                    <p className="card_detail_plant_info_sub">
                      {plant.sunlight}
                    </p>
                  </div>
                  <div className="card_detail_plant_info">
                    <div className="card_detail_plant_span_wrap">
                      <p className="card_detail_plant_info_title">환경</p>
                      <span className="card_detail_plant_info_span"></span>
                    </div>
                    <p className="card_detail_plant_info_sub">
                      {plant.environment}
                    </p>
                  </div>
                  <div>
                    <div className="card_detail_plant_span_wrap">
                      <p className="card_detail_plant_info_title">주의 사항 </p>
                      <span className="card_detail_plant_info_span"></span>
                    </div>
                    <p className="card_detail_plant_info_sub">
                      {plant.precautions}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>해당 식물을 찾을 수 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default CardDetail;
