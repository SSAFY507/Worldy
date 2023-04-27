import axios from 'axios';

type InputType = {
  APIName?: string;
  APIType: 'get' | 'post' | 'put' | 'delete';
  UrlQuery: string;
  Body?: Map<string, any>;
};

export default async function CustomAxios(input: InputType): Promise<any> {
  const QUERY =
    input.UrlQuery.at(0) === '/' ? input.UrlQuery.slice(1) : input.UrlQuery;
  const URL = `http://localhost:8000/api/${QUERY}`;

  try {
    const config = {
      method: input.APIType,
      url: URL,
      data: input.Body ? Object.fromEntries(input.Body) : undefined,
    };

    const { data } = await axios(config);
    return data;
  } catch (e) {
    console.log(
      `${input.APIType.toUpperCase()} 타입의 API 에러`,
      input.APIName ? input.APIName : '(이름 명시X)'
    );
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

        const response = await CustomAxios({
          APIName: "MyPost",
          APIType: "post",
          UrlQuery: "/game/monopoly?uid=1&dice=3",
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
