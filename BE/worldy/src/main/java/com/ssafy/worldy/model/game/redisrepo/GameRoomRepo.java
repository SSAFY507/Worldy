package com.ssafy.worldy.model.game.redisrepo;

import com.ssafy.worldy.model.game.dto.GameRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

 /**
 * 게임방 정보가 초기화 되지 않도록 생성 시 Redis Hash에 저장
 * 게임방 정보를 조회할 때는 Redis Hash에 저장된 데이터 사용
 * 게임방 입장 시에는 게임방 id로 Redis의 Topic을 조회하여 pub/sub 메시지 리스너와 연동
 **/
@RequiredArgsConstructor
@Repository
public class GameRoomRepo {

    // Topic에 발행되는 메시지를 처리할 Listner
     private static final String GAME_ROOMS = "GAME_ROOM";
     private static final String GAME_PLYER = "GAME_PLAYER";
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, String, GameRoom> opsHashGameRoom;
    private HashOperations<String, String, List<String>> opsHashGameRoomPlayer;

    // 메시지를 발행하기 위한 redis topic 정보. 서버별로 채팅방에 매치되는 topic정보를 Map에 넣어 roomId로 찾을수 있도록 한다.
    private Map<String, ChannelTopic> topics;
    private ChannelTopic channelTopic;

    @PostConstruct
    private void init() {
        opsHashGameRoom = redisTemplate.opsForHash();
        opsHashGameRoomPlayer = redisTemplate.opsForHash();
        topics = new HashMap<>();
    }

    /**
     * 모든 게임방 조회
     **/
    public List<GameRoom> findAllRoom() {
        return opsHashGameRoom.values(GAME_ROOMS);
    }

     /**
      * 게임방 생성 : 서버간 채팅방 공유를 위해 redis hash에 저장
      */
    public GameRoom createGameRoom() {

        GameRoom gameRoom = GameRoom.create();
        opsHashGameRoom.put(GAME_ROOMS, gameRoom.getRoomId(), gameRoom);
        return gameRoom;
    }

     /**
      * 게임에 입장한 플레이어
      */
    public void enterGameRoom(String kakaoId, String roomId) {

        List<String> player = opsHashGameRoomPlayer.get(GAME_PLYER, roomId);

        if(player == null) player = new ArrayList<>();
        player.add(kakaoId);

        opsHashGameRoomPlayer.put(GAME_PLYER, roomId, player);
     }

     /**
      * 게임에 입장한 플레이어 수
      */
     public double playerCnt(String roomId) {
         List<String> player = opsHashGameRoomPlayer.get(GAME_PLYER, roomId);

         if(player==null) return 0;

         return player.size();
     }

     /**
      * 게임방 삭제
      */
     public void deleteGameRoom(String roomId) {

         opsHashGameRoom.delete(GAME_ROOMS, roomId);
         opsHashGameRoomPlayer.delete(GAME_ROOMS, roomId);
     }
}
