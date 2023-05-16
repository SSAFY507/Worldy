package com.ssafy.worldy.model.game.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

/**
 * Redis에 저장되는 객체는 Serialize 가능해야하므로 Serializerble을 참조하도록 선언하고
 **/
@Getter
@Setter
public class GameRoom implements Serializable {

    private static final long serialVersionUID = 6494678977089006639L;
    private String roomId;

    public static GameRoom create() {
        GameRoom gameRoom = new GameRoom();
        gameRoom.roomId = UUID.randomUUID().toString();
        return gameRoom;
    }
}
