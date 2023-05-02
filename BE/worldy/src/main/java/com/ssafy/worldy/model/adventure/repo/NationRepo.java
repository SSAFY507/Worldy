package com.ssafy.worldy.model.adventure.repo;

import com.ssafy.worldy.model.adventure.entity.Nation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NationRepo extends JpaRepository<Nation, Long> {

    Optional<Nation> findByNationId(Long nationId);
}