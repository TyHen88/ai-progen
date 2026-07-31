package com.projectgenerator.worker.archive;

import java.io.File;
import java.io.IOException;

public interface ArchiveService {

    File createZipArchive(File sourceDir, String outputZipName) throws IOException;
}
