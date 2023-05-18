import React from 'react';
import axios from 'axios';

interface PayResultClassProps {
  location: {
    search: string;
  };
}

class PayResultClass extends React.Component<PayResultClassProps> {
  constructor(props: PayResultClassProps) {
    super(props);

    const {
      location: { search },
    } = props;

    // url에 붙어서 온 pg_token을 결제 API에 줄 params에 할당
    const pg_token = search.split('=')[1];

    this.state = {
      params: {
        cid: 'TC0ONETIME',
        // localstorage에서 tid값을 읽어온다.
        tid: window.localStorage.getItem('tid'),
        partner_order_id: 'partner_order_id',
        partner_user_id: 'partner_user_id',
        pg_token: pg_token,
      },
    };
  }

  state: {
    params: {
      cid: string;
      tid: string | null;
      partner_order_id: string;
      partner_user_id: string;
      pg_token: string;
    };
  };

  componentDidMount() {
    const { params } = this.state;
    const adminKey = 'c6f82fc3b98485b2394889a33664e793';

    const KAKAO_DOMAIN = process.env.REACT_KAKAO_BASE_URL;

    axios({
      baseURL: KAKAO_DOMAIN,

      url: '/v1/payment/approve',
      method: 'POST',
      headers: {
        Authorization: `KakaoAK ${adminKey}`,

        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params,
    }).then((response) => {
      // 결제 승인에 대한 응답 출력
      console.log(response);
    });
  }

  render() {
    return <div></div>;
  }
}
export default PayResultClass;
