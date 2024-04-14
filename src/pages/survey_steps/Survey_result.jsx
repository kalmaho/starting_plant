import React, { useState, useEffect } from "react";
import "../../styles/common/all.css";
import "../../styles/Survey.css";

export default function Survey_result({ userData }) {
  const [recommendedPlants, setRecommendedPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        // API 요청을 보내기 위한 URL 구성
        // 예시 URL입니다. 실제 URL로 대체해야 합니다.
        const apiUrl = `https://api.example.com/plants?level=${userData.level}&type=${userData.type}&place=${userData.place}&price=${userData.price}&life=${userData.life}&height=${userData.height}`;

        // API 요청
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("API 요청에 실패했습니다.");
        }
        const data = await response.json();

        // 데이터 설정
        setRecommendedPlants(data.plants);
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다.", error);
        setRecommendedPlants([]);
      }
    };

    fetchPlants();
  }, [userData]); // userData가 변경될 때마다 이 useEffect를 다시 실행합니다.
  return (
    <div>
      <h2 className="last_test">추천 식물</h2>
      {recommendedPlants.length > 0 ? (
        <ul>
          {recommendedPlants.map((plant, index) => (
            <li key={index}>{plant.name}</li> // 실제 API 응답에 따라 필드명은 달라질 수 있습니다.
          ))}
        </ul>
      ) : (
        <p>추천할 식물이 없습니다. 조건을 변경해 보세요.</p>
      )}
    </div>
  );
}

