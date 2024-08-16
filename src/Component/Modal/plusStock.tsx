import { Input } from "../Input/input";
import ModalOpen from "./modal";
import * as M from "../List/modalStyle";
import GukBap from "../../img/Gukbap.png";

interface StockPlusModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
}

const StockPlusModal: React.FC<StockPlusModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
}) => {
  return (
    <ModalOpen
      title="종목 추가"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      showOneConfirmBtn={true}
      text="추가 매수"
      onConfirm={onConfirm}
    >
      <div>
        <M.Box>
          <M.Img src={GukBap} alt="주식 종목" />
          <div>
            <h2>APS</h2>
            <M.P>054620</M.P>
          </div>
        </M.Box>
        <M.Container>
          <table
            style={{
              width: "100%",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <thead>
              <tr>
                <th></th>
                <th>수량</th>
                <th>구매 가격 (₩)</th>
                <th>투자 금액(₩)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>현재</td>
                <td>50</td>
                <td>5,000</td>
                <td>250,000</td>
              </tr>
              <tr>
                <td>추가</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>합계</td>
                <td>50</td>
                <td>5,000</td>
                <td>250,000</td>
              </tr>
            </tbody>
          </table>
          <div>
            <M.Div>수량</M.Div>
            <Input placeholder="ex) 100" size="medium" colorType="fillType" />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <M.Div>평균 단가</M.Div>
            <Input
              placeholder="ex) 10,000"
              size="medium"
              colorType="fillType"
            />
          </div>
        </M.Container>
      </div>
    </ModalOpen>
  );
};

export default StockPlusModal;
