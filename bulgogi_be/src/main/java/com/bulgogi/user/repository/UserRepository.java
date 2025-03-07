package com.bulgogi.user.repository;

import com.bulgogi.user.dto.UserLoginDTO;
import com.bulgogi.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    // 로그인 (이메일, 비밀번호만 조회)
    @Query("SELECT new com.bulgogi.user.dto.UserLoginDTO(u.id, u.email, u.password) FROM User u WHERE u.email = :email")
    Optional<UserLoginDTO> findEmailAndPasswordByEmail(@Param("email") String email);
}
