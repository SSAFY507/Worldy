package com.ssafy.worldy.util;

import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Slf4j
public class FastAPIUtil {

    public JSONObject getRequestFastAPI(String requestUrl) {
        RestTemplate rt = new RestTemplate();

        ResponseEntity<String> response = rt.getForEntity(
                requestUrl,
                String.class
        );

        return toJSONObject(response);
    }
    public JSONObject postRequestFastAPI(String requestUrl, Map<String, List> params) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("accept", "text/plain;charset=UTF-8");

        HttpEntity<Map<String, List>> entity = new HttpEntity<>(params, headers);

        RestTemplate rt = new RestTemplate();

        ResponseEntity<String> response = rt.exchange(
                requestUrl,
                HttpMethod.POST,
                entity,
                String.class
        );

        return toJSONObject(response);
    }

    private JSONObject toJSONObject(ResponseEntity<String> response){
        String result = response.getBody(); // 리턴되는 결과의 body 저장
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject = null;

        try {
            jsonObject = (JSONObject) jsonParser.parse(result);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        log.info(jsonObject.toJSONString());
        return jsonObject;
    }
}
