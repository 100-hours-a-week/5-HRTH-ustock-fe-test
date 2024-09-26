import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import GameButtons from "../../Component/Game/GameButtons";
import GameHeader from "../../Component/Game/GameHeader";
import GameMoney from "../../Component/Game/GameMoney";
import StocksTable from "../../Component/Game/StocksTable";
import styled from "styled-components";
import GameTradeSwipe from "../../Component/Game/GameTradeSwipe";
import { useState } from "react";
import PassConfirmModal from "../../Component/Game/PassConfirmModal";
import axios from "axios";
import "./gameStyle.css";
import HappyNewYearModal from "./HappyNewYearModal";
import { useStock } from "../../store/stockContext";
import { usePortfolioStore } from "../../store/usePortfolioStore";
import ProgressBar from "../../Game/Loading/progressBar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const PlayPage = () => {
  const { year } = useParams<{ year: string }>();
  const { stockData, setStockData } = useStock();
  const nav = useNavigate();
  const yearValue = year || "2014";
  const [isTradeModalVisible, setIsTradeModalVisible] = useState(false);
  const [isPassModalVisible, setIsPassModalVisible] = useState(false);
  const [isHappyNewYearModal, setIsHappyNewYearModal] = useState(false);
  const [budget, setBudget] = useState(0);
  const [loading, setLoading] = useState(false);

  const check = usePortfolioStore((state) => state.check);
  const setCheck = usePortfolioStore((state) => state.setCheck);

  const startYear = 2014;
  const lastYear = 2023;

  // 년도 진행률 표시
  const calculateProgress = () => {
    return (
      ((parseInt(yearValue, 10) - startYear) / (lastYear - startYear)) * 100
    );
  };

  const [progress, setProgress] = useState<number>(calculateProgress);

  // 거래하기 모달 핸들러
  const openTradeModal = () => {
    setIsTradeModalVisible(true);
  };

  const closeTradeModal = () => {
    setIsTradeModalVisible(false);
  };

  // 넘어가기 모달 핸들러
  const openPassModal = () => {
    setIsPassModalVisible(true);
  };

  const closePassModal = () => {
    setIsPassModalVisible(false);
  };

  // 넘어가기 버튼 누르면 중간결과 호출
  const handleConfirmPass = async () => {
    try {
      setLoading(true);
      setIsHappyNewYearModal(true);
      setIsPassModalVisible(false);

      if (year === "2023") {
        console.log("게임 끝");
        nav("/game/result/total");
      } else {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/v1/game/interim`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          if (
            (parseInt(yearValue, 10) + 1).toString() ===
            response.data.year.toString()
          ) {
            const updatedStockList = response.data.stockList;
            setStockData(updatedStockList);
          }

          // API 완료 후 모달 닫고 페이지 이동
          setIsHappyNewYearModal(false);
          const nextYear = (parseInt(yearValue, 10) + 1).toString();
          nav(`/game/play/${nextYear}`);
          setCheck(!check);
          setProgress(
            ((parseInt(nextYear, 10) - startYear) / (lastYear - startYear)) *
              100
          );
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      closePassModal();
    }
  };

  return (
    <Container>
      <GameHeader text={year || "Default"} />

      <div
        style={{
          width: "100%",
          marginTop: "1rem",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <p
            style={{
              paddingLeft: "3.5rem",
              fontSize: "12px",
              marginBottom: "0.5rem",
            }}
          >
            게임 진행도
          </p>
        </div>
        <ProgressBar progress={progress} />
      </div>
      <GameMoney setBudget={setBudget} budget={budget} />
      <StocksTable stocks={stockData || []} />
      <GameButtons
        openTradeModal={openTradeModal}
        openPassModal={openPassModal}
        setBudget={setBudget}
        budget={budget}
      />
      <GameTradeSwipe
        isVisible={isTradeModalVisible}
        onClose={closeTradeModal}
        year={yearValue.toString()}
        budget={budget}
      />
      <PassConfirmModal
        isOpen={isPassModalVisible}
        onRequestClose={closePassModal}
        onConfirm={handleConfirmPass}
      />
      <HappyNewYearModal isVisible={isHappyNewYearModal} />
    </Container>
  );
};

export default PlayPage;
