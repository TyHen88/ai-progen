package com.projectgenerator.worker.archive.impl;

import com.projectgenerator.worker.archive.ArchiveService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveOutputStream;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

@Slf4j
@Service
public class ZipArchiveServiceImpl implements ArchiveService {

    @Value("${storage.archive-output-dir:./storage/archives}")
    private String archiveOutputDir;

    @Override
    public File createZipArchive(File sourceDir, String outputZipName) throws IOException {
        File outputDir = new File(archiveOutputDir);
        if (!outputDir.exists() && !outputDir.mkdirs() && !outputDir.exists()) {
            throw new IOException("Failed to create archive output directory: " + outputDir.getAbsolutePath());
        }

        File zipFile = new File(outputDir, outputZipName.endsWith(".zip") ? outputZipName : outputZipName + ".zip");
        log.info("Creating ZIP archive at {}", zipFile.getAbsolutePath());

        try (ZipArchiveOutputStream zos = new ZipArchiveOutputStream(new FileOutputStream(zipFile))) {
            compressDirectory(sourceDir, sourceDir.getName(), zos);
        }

        return zipFile;
    }

    private void compressDirectory(File folder, String parentFolder, ZipArchiveOutputStream zos) throws IOException {
        File[] files = folder.listFiles();
        if (files == null) return;

        for (File file : files) {
            if (file.isDirectory()) {
                compressDirectory(file, parentFolder + "/" + file.getName(), zos);
                continue;
            }

            ZipArchiveEntry zipEntry = new ZipArchiveEntry(file, parentFolder + "/" + file.getName());
            zos.putArchiveEntry(zipEntry);
            try (FileInputStream fis = new FileInputStream(file)) {
                IOUtils.copy(fis, zos);
            }
            zos.closeArchiveEntry();
        }
    }
}
