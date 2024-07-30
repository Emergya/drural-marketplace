import * as React from "react";

import * as S from "./styles";

const CostRow: React.FC<{
  mediumScreen: boolean;
  heading: string;
  cost: React.ReactNode;
}> = ({ mediumScreen, heading, cost }) => (
  <tr>
    <S.Td colSpan={mediumScreen ? 4 : 3} className="cart-table__cost">
      {heading}
    </S.Td>
    <S.Td colSpan={2}>{cost}</S.Td>
  </tr>
);

export default CostRow;
