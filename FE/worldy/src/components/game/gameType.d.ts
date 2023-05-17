/* @types/Membership.d.ts 파일 */

//모듈이름 선언 (.d.ts파일을 구현하는 모듈 이름과 일치시킴)
declare module 'gameType';

//Object Type 선언

type NewPlayer = {
  roomId: string,
  type: string,
  p1: {
    playerNum: number,
    playerId: string,
    name: string,
    game: {
      location: number,
      balance: number,
      desert: number,
      state: boolean,
      dice1: number,
      dice2: number,
      dice: number,
      isDouble: boolean,
      own: [],
      lap: number,
      ranking: number,
    }
  },
  p2: {
    playerNum: number,
    playerId: string,
    name: string,
    game: {
      location: number,
      balance: number,
      desert: number,
      state: boolean,
      dice1: number,
      dice2: number,
      dice: number,
      isDouble: boolean,
      own: [],
      lap: number,
      ranking: number,
    }
  },
  p3: {
    playerNum: number,
    playerId: string,
    name: string,
    game: {
      location: number,
      balance: number,
      desert: number,
      state: boolean,
      dice1: number,
      dice2: number,
      dice: number,
      isDouble: boolean,
      own: [],
      lap: number,
      ranking: number,
    }
  },
  p4: {
    playerNum: number,
    playerId: string,
    name: string,
    game: {
      location: number,
      balance: number,
      desert: number,
      state: boolean,
      dice1: number,
      dice2: number,
      dice: number,
      isDouble: boolean,
      own: [],
      lap: number,
      ranking: number,
    }
  },
}

type User = {
  kakaoId: string,
  nickName: string,
  profileImg: string,
  mmr : number,
  level : number,
  tier : string,
}

type Price = {
  land: number,
  villa: number,
  hotel: number,
  landmark: number,
}


type Spot = {
  location: number,
  name: string,
  price: Price,
  type: string,
  landmark?: string,
  contents: string,
  continent?: string,
  owner: number,
  option: number,
  toll: number,
  build: {
    land: boolean,
    villa: boolean,
    hotel: boolean,
    landmark: boolean,
  },
}


type Game = {
  location: number,
  balance: number,
  desert: number,
  state: boolean,
  dice1: number,
  dice2: number,
  dice: number,
  isDouble: boolean,
  own: number[]
  lap: number,
  ranking: number,
}

type Player = {
  playerNum: number,
  playerId: string,
  name: string,
  type: string,
  game: {
    location: number,
    balance: number,
    desert: number,
    state: boolean,
    dice1: number,
    dice2: number,
    dice: number,
    isDouble: boolean,
    own: [],
    lap: number,
    ranking: number,
  }
}
type Item = {
  id: number,
  title: string,
  content: string,
}

type GameResult = {
  first: {
    kakaoId: string,
    nationList: number[]
  },
  second: {
    kakaoId: string,
    nationList: number[]
  },
  third: {
    kakaoId: string,
    nationList: number[]
  },
  fourth: {
    kakaoId: string,
    nationList: number[]
  }
}


type GameResultPageDate = {
  first: {
    kakaoId: string,
    nationList: number[]
  },
  second: {
    kakaoId: string,
    nationList: number[]
  },
  third: {
    kakaoId: string,
    nationList: number[]
  },
  fourth: {
    kakaoId: string,
    nationList: number[]
  }
}