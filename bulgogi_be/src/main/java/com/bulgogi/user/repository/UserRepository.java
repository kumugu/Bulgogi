package com.bulgogi.user.repository;

import com.bulgogi.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * ============================================
     * JpaRepository가 기본적으로 제공하는 CRUD 메서드
     * ============================================
     * save(S entity) : 엔티티를 저장하거나 업데이트
     * findById(ID id) : ID로 엔티티 조회
     * findAll() : 모든 엔티티 조회
     * deleteById(ID id) : ID로 엔티티 삭제
     * deleteAll() : 모든 엔티티 삭제
     *
     */

    // 이메일 사용자 조회
    Optional<User> findByEmail(String email);

    // 사용자명으로 사용자 조회
    Optional<User> findByUsername(String username);

    // 회원가입 (이메일, 사용자명)
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
