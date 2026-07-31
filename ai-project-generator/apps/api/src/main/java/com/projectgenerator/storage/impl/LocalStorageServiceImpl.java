package com.projectgenerator.storage.impl;

import com.projectgenerator.common.exception.BusinessException;
import com.projectgenerator.storage.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@Service
public class LocalStorageServiceImpl implements StorageService {

    @Value("${storage.archive-output-dir:./storage/archives}")
    private String archiveOutputDir;

    @Override
    public Resource loadArchiveAsResource(String filename) {
        try {
            Path baseDir = Paths.get(archiveOutputDir).toAbsolutePath().normalize();
            Path filePath = baseDir.resolve(filename).normalize();

            // filename is client-controlled; without this check "../../.." (or a raw absolute
            // path) would resolve outside archiveOutputDir and let a caller read any file the
            // process can access.
            if (!filePath.startsWith(baseDir)) {
                throw new BusinessException("Invalid filename: " + filename, HttpStatus.BAD_REQUEST);
            }

            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new BusinessException("File not found or unreadable: " + filename, HttpStatus.NOT_FOUND);
            }
        } catch (MalformedURLException ex) {
            throw new BusinessException("Malformed file path: " + filename, HttpStatus.BAD_REQUEST);
        }
    }
}
