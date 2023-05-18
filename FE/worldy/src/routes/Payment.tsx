import React, { Component } from 'react';
import axios from 'axios';

import kakaopay from '../assets/images/KakaoPayButton.png';

interface AppState {
  next_redirect_pc_url: string;
  tid: string;
  params: {
    cid: string;
    partner_order_id: string;
    partner_user_id: string;
    item_name: string;
    quantity: number;
    total_amount: number;
    vat_amount: number;
    tax_free_amount: number;
    approval_url: string;
    fail_url: string;
    cancel_url: string;
  };
}
const DOMAIN = process.env.REACT_APP_BASE_URL;
const DOMAIN_S = process.env.REACT_APP_BASE_URL_SHORTER;
class Payment extends Component<{}, AppState> {
  state: AppState = {
    // 응답에서 가져올 값들
    next_redirect_pc_url: '',
    tid: '',
    // 요청에 넘겨줄 매개변수들
    params: {
      cid: 'TC0ONETIME', //지급받은 테스트용 cid
      partner_order_id: 'partner_order_id',
      partner_user_id: 'partner_user_id',
      item_name: '기부',
      quantity: 1,
      total_amount: 2200,
      vat_amount: 0,
      tax_free_amount: 0,
      approval_url: DOMAIN_S + '/paymentsuccess',
      fail_url: DOMAIN_S + '/',
      cancel_url: DOMAIN_S + '/',
    },
  };

  componentDidMount() {
    const adminKey = 'c6f82fc3b98485b2394889a33664e793';

    const DOMAIN = process.env.REACT_APP_BASE_URL;
    const DOMAIN_S = process.env.REACT_APP_BASE_URL_SHORTER;
    const KAKAO_DOMAIN = process.env.REACT_KAKAO_BASE_URL + '/';

    console.log('zkzkdh', process.env.REACT_KAKAO_BASE_URL);
    const { params } = this.state;
    axios({
      // 프록시에 카카오 도메인을 설정했으므로 결제 준비 url만 주자
      baseURL: KAKAO_DOMAIN,

      url: '/v1/payment/ready',
      // 결제 준비 API는 POST 메소드라고 한다.
      method: 'POST',
      headers: {
        // 카카오 developers에 등록한 admin키를 헤더에 줘야 한다.
        Authorization: `KakaoAK ${adminKey}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      // 설정한 매개변수들
      params,
    }).then((response) => {
      // 응답에서 필요한 data만 뽑는다.
      const {
        data: { next_redirect_pc_url, tid },
      } = response;

      //console.log(next_redirect_pc_url);
      //console.log(tid);
      // 응답 data로 state 갱신
      window.localStorage.setItem('tid', tid);
      this.setState({ next_redirect_pc_url, tid });
    });
  }

  render() {
    const { next_redirect_pc_url } = this.state;

    return (
      <a href={next_redirect_pc_url}>
        <img src={kakaopay} alt='카카오페이' />
      </a>
    );
  }
}
export default Payment;
