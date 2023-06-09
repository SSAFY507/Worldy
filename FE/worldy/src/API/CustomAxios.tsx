import axios from 'axios';

type InputType = {
  APIName?: string;
  APIType: 'get' | 'post' | 'put' | 'delete';
  UrlQuery: string;
  Body?: Map<string, any>;
  Token?: string | null;
};

const DOMAIN = process.env.REACT_APP_BASE_URL

export default async function CustomAxios(input: InputType): Promise<any> {
  //console.log('바디 : ', input.Body ? Object.fromEntries(input.Body) : '없음');
  try {
    const config = {
      method: input.APIType,
      // url: DOMAIN + input.UrlQuery,
      url: input.UrlQuery,
      data: input.Body ? Object.fromEntries(input.Body) : undefined,
      headers: input.Token
        ? { Authorization: `Bearer ${input.Token}` }
        : undefined,
    };

    const { data } = await axios(config);
    //console.log(`${input.APIName} API 성공`, data);
    return data;
  } catch (e) {
    // console.log(
    //   `${input.APIType.toUpperCase()} 타입의 API 에러`,
    //   input.APIName ? input.APIName : '(이름 명시X)'
    // );
    console.error(e);
    throw e;
  }
}

/* 사용 예시

  const [result, setResult] = useState(null);

  useEffect(() => {
    
    const fetchData = async () => {
        
      try {

        const requestBody = new Map([
          ['key1', 'value1'],
          ['key2', 'value2'],
        ]);

        const requestBody = new Map([['query', ['match', ['content.nori', input]]]]);


        const response = await CustomAxios({
          APIName: "MyPost",
          APIType: "post",
          UrlQuery: "http://localhost:9090/api/help/write",
          Body: requestBody,
        });

        setResult(response);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

*/
