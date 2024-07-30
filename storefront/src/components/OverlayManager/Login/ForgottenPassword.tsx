import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";

import { paths } from "@paths";

import * as S from "./styles";

const ForgottenPassword: React.FC<{ onClick: () => void }> = ({
  onClick: hide,
}) => (
  <>
    <div className="login__content__password-reminder">
      <Link href={paths.forgottenPassword}>
        <S.ForgottenPassword>
          <span onClick={hide}>
            <FormattedMessage defaultMessage="I forgot my password" />
          </span>
        </S.ForgottenPassword>
      </Link>
    </div>
  </>
);

export default ForgottenPassword;
