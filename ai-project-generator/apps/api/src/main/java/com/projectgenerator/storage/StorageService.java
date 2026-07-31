package com.projectgenerator.storage;

import org.springframework.core.io.Resource;

/**
 * Read-only from apps/api's side — apps/worker writes archive files directly to the shared
 * storage.archive-output-dir; this service exists only to safely serve them back for download.
 */
public interface StorageService {

    Resource loadArchiveAsResource(String filename);
}
