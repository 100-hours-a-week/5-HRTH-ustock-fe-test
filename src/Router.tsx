import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/home";
import Layout from "./Component/Layout/Layout";
import SearchStock from "./Pages/searchStock";
import PortfolioPage from "./Pages/portfolio";
import CallBackPage from "./Component/GoogleLogin/callback";
import StockDetail from "./Pages/stockDetail/stockDetail";
import PortfolioNo from "./Pages/PortfolioNo";
import PortfolioDetailPage from "./Pages/PortfolioDetailPage";
import SkrrrGamePage from "./Pages/skrrrGame";
import { useAuth } from "./contexts/authContext";
import NoUserPage from "./Pages/404/noUser";
import LoginPage from "./Pages/404/loginPage";
import ErrorPage from "./Pages/404/errorPage";
import PlayPage from "./Pages/game/playPage";
import InfoPage from "./Pages/game/infoPage";
import PlayResult from "./Pages/game/playResult";
import TotalResult from "./Pages/game/totalResult";
import GameStocks from "./Pages/game/gameStocks";
import Rank from "./Pages/game/rank";

const Router = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/nologin" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/stocks" element={<SearchStock />} />
          <Route path="/stocks/:id" element={<StockDetail />} />
          {user ? (
            <>
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/:id" element={<PortfolioDetailPage />} />
            </>
          ) : (
            <Route path="/*" element={<NoUserPage />} />
          )}
          <Route path="/auth/callback" element={<CallBackPage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
        <Routes>
          <Route path="/game" element={<SkrrrGamePage />} />
          <Route path="/play/:year" element={<PlayPage />} />
          <Route path="/info/:year" element={<InfoPage />} />
          <Route path="/result/:year" element={<PlayResult />} />
          <Route path="/result/total" element={<TotalResult />} />
          <Route path="/gameStocks" element={<GameStocks />} />
          <Route path="/rank" element={<Rank />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
