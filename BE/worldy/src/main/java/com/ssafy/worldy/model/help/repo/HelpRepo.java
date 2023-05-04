package com.ssafy.worldy.model.help.repo;

import com.ssafy.worldy.model.help.entity.Help;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HelpRepo extends JpaRepository<Help, Long> {
}
