package com.bulgogi.user.controller;

import com.bulgogi.user.dto.UserRequestDTO;
import com.bulgogi.user.dto.UserResponseDTO;
import com.bulgogi.user.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // 다른 사용자 정보 수정 (ADMIN 만 수정 가능)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{targetUserId}/update")
    public ResponseEntity<UserResponseDTO> adminUpdateUserInfo(@PathVariable Long targetUserId, @RequestBody UserRequestDTO adminUpdateRequestDTO) {
        UserResponseDTO updateUser = adminService.adminUpdateUserInfo(targetUserId, adminUpdateRequestDTO);
        return ResponseEntity.ok(updateUser);
    }
}
