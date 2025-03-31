package com.bulgogi.user.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class S3Service {

    // AWS S3 관련 설정 값
    private final String bucketName;
    private final String accessKey;
    private final String secretKey;
    private final String region;
    private final S3Client s3;

    /**
     * 생성자: 애플리케이션 프로퍼티 또는 환경 변수에 정의된 AWS S3 설정 값을 주입받아 초기화
     *
     * @param bucketName AWS S3 버킷 이름
     * @param accessKey  AWS 액세스 키
     * @param secretKey  AWS 시크릿 키
     * @param region     AWS S3 버킷 리전 (ex: ap-northeast-2)
     */
    public S3Service(
            @Value("${aws.s3.bucket-name}") String bucketName,
            @Value("${aws.s3.access-key}") String accessKey,
            @Value("${aws.s3.secret-key}") String secretKey,
            @Value("${aws.s3.region}") String region) {

        this.bucketName = bucketName;
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.region = region;

        // S3Client를 주어진 리전과 자격 증명으로 한 번 생성
        this.s3 = S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create(this.accessKey, this.secretKey)))
                .build();
    }

    /**
     * 업로드할 파일을 AWS S3에 저장
     *
     * @param file 업로드할 MultipartFile 객체
     * @return S3에 업로드된 파일에 접근할 수 있는 URL
     * @throws IOException 파일 처리가 실패할 경우 발생
     */
    public String uploadFile(MultipartFile file) throws IOException {
        // 고유 파일명을 생성: "profile-images/" 디렉토리 아래에 UUID와 원래 파일명을 사용하여 저장
        String fileName = "profile-images/" + UUID.randomUUID() + "_" + file.getOriginalFilename();

        // PutObjectRequest를 생성하여 파일을 S3에 업로드 (s3 인스턴스 재사용)
        s3.putObject(PutObjectRequest.builder()
                        .bucket(this.bucketName)  // 버킷 이름 설정
                        .key(fileName)            // 파일 경로 지정 (키)
                        .build(),
                RequestBody.fromBytes(file.getBytes()));

        return fileName;
    }

    /**
     * 저장된 프로필 이미지의 URL을 생성하여 반환.
     * 만약 이미 저장된 값이 full URL이라면 그대로 반환하고,
     * 그렇지 않으면 S3 버킷, 리전, 그리고 파일 key를 조합하여 URL을 생성.
     *
     * @param fileKey S3에 저장된 파일의 키 또는 기존 full URL
     * @return 클라이언트가 접근 가능한 full URL 문자열
     */
    public String getFileUrl(String fileKey) {
        // 만약 fileKey가 없으면 기본 프로필 이미지를 반환
        if (fileKey == null || fileKey.trim().isEmpty()) {
            return "https://bulgogoi-image.s3.ap-northeast-2.amazonaws.com/profile-images/default-profile.png";
        }
        // 이미 full URL 형식이면 그대로 반환
        if (fileKey.startsWith("http")) {
            return fileKey;
        }
        // 상대 경로의 경우, S3 URL 생성
        return String.format("https://%s.s3.%s.amazonaws.com/%s",
                this.bucketName, this.region, fileKey);
    }

    /**
     * AWS S3 버킷 안의 "profile-images/" 디렉토리에 있는 모든 파일 목록을 조회
     *
     * @return 파일 키(경로)들의 List
     */
    public List<String> listProfileImages() {
        // "profile-images/" 프리픽스를 가지는 객체들을 요청
        ListObjectsV2Request request = ListObjectsV2Request.builder()
                .bucket(this.bucketName)
                .prefix("profile-images/")
                .build();

        // 객체 목록 응답을 받음
        ListObjectsV2Response response = s3.listObjectsV2(request);

        // 각 S3Object의 key 값을 추출하여 리스트로 반환
        return response.contents().stream()
                .map(S3Object::key)
                .collect(Collectors.toList());
    }

    /**
     * S3 버킷에서 지정된 파일을 다운로드하여 바이트 배열로 반환
     *
     * @param fileName 다운로드할 S3 객체의 키
     * @return 파일의 바이트 배열
     * @throws IOException 다운로드 도중 발생하는 예외
     */
    public byte[] downloadFile(String fileName) throws IOException {
        // 다운로드 요청을 구성: bucket과 파일의 키 값을 지정
        GetObjectRequest request = GetObjectRequest.builder()
                .bucket(this.bucketName)
                .key(fileName)
                .build();

        // 지정된 객체를 바이트 배열로 가져옴
        ResponseBytes<GetObjectResponse> objectBytes = s3.getObjectAsBytes(request);
        return objectBytes.asByteArray();
    }

    /**
     * S3에서 특정 파일 삭제
     *
     * @param fileName 삭제할 파일 이름 (예: "profile-images/abc123.png")
     */
    public void deleteFile(String fileName) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(this.bucketName)
                .key(fileName)
                .build();

        s3.deleteObject(deleteObjectRequest);
    }
}
