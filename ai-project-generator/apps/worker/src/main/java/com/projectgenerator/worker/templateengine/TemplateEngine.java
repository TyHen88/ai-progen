package com.projectgenerator.worker.templateengine;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

/**
 * Renders a template's files/ directory into a target workspace: {{VARIABLE_NAME}} interpolation
 * on file contents, plus resolution of the one supported dynamic path segment
 * (__PACKAGE_PATH__, derived from PACKAGE_NAME) for stacks that need a Java-style package
 * directory. See templates/AGENT.md and packages/template-engine/PROCESS.md for the convention
 * this implements. Deliberately does not interpolate arbitrary path segments — only this one
 * validated token — so template variables can't be used for path traversal.
 */
@Slf4j
@Component
public class TemplateEngine {

    private static final String PACKAGE_PATH_TOKEN = "__PACKAGE_PATH__";
    private static final Pattern PACKAGE_NAME_PATTERN = Pattern.compile("^[a-z][a-z0-9]*(\\.[a-z][a-z0-9]*)*$");
    private static final Pattern VARIABLE_PATTERN = Pattern.compile("\\{\\{(\\w+)}}");

    public void render(Path templateFilesDir, Path outputDir, Map<String, String> variables) throws IOException {
        String packagePath = resolvePackagePath(variables.get("PACKAGE_NAME"));

        try (Stream<Path> paths = Files.walk(templateFilesDir)) {
            for (Path source : paths.filter(Files::isRegularFile).toList()) {
                Path relative = templateFilesDir.relativize(source);
                Path target = resolveTarget(outputDir, relative, packagePath);

                Files.createDirectories(target.getParent());
                String content = Files.readString(source, StandardCharsets.UTF_8);
                Files.writeString(target, interpolate(content, variables), StandardCharsets.UTF_8);
            }
        }
    }

    private String resolvePackagePath(String packageName) {
        if (packageName == null || packageName.isBlank()) {
            return null;
        }
        if (!PACKAGE_NAME_PATTERN.matcher(packageName).matches()) {
            throw new IllegalArgumentException("Invalid PACKAGE_NAME (expected lowercase dotted segments): " + packageName);
        }
        return packageName.replace('.', '/');
    }

    private Path resolveTarget(Path outputDir, Path relative, String packagePath) {
        Path result = outputDir;
        for (Path segment : relative) {
            String name = segment.toString();
            if (name.equals(PACKAGE_PATH_TOKEN)) {
                if (packagePath == null) {
                    throw new IllegalArgumentException("Template requires PACKAGE_NAME but none was provided");
                }
                for (String part : packagePath.split("/")) {
                    result = result.resolve(part);
                }
            } else {
                result = result.resolve(name);
            }
        }
        return result;
    }

    private String interpolate(String content, Map<String, String> variables) {
        return VARIABLE_PATTERN.matcher(content).replaceAll(match -> {
            String value = variables.get(match.group(1));
            return value != null ? Matcher.quoteReplacement(value) : Matcher.quoteReplacement(match.group());
        });
    }
}
