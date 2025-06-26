export type Pagination = {
    take: number;
    skip: number;
};
export declare class PaginationBuilder {
    private pageNumber;
    private pageSize;
    /**
     * Defines how many results to return
     * @param pageSize
     * @returns
     */
    setPageSize(pageSize: number): this;
    /**
     * Page starts at 1, so this to skip 'X' pages of results
     * @param pageNumber
     * @returns
     */
    setPage(pageNumber: number): this;
    build(): Pagination;
}
