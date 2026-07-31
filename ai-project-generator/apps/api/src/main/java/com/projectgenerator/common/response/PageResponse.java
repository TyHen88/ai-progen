package com.projectgenerator.common.response;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * A plain serialization of Spring Data's Page<T> — returning Page<T> directly from a
 * controller works but triggers a Jackson warning (PageImpl has no default constructor for
 * deserialization) on every request; this sidesteps it with an explicit, stable shape.
 */
@Getter
@Builder
public class PageResponse<T> {

    private List<T> items;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;

    public static <T> PageResponse<T> of(Page<T> page) {
        return PageResponse.<T>builder()
                .items(page.getContent())
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .build();
    }
}
