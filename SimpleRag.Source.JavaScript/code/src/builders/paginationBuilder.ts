export type Pagination = {
    take: number;
    skip: number;
}

export class PaginationBuilder {
    private pageNumber: number = 1;
    private pageSize: number = 10;

    /**
     * Defines how many results to return
     * @param pageSize 
     * @returns 
     */
    public setPageSize(pageSize: number): this {
        if (pageSize < 0) {
            throw new Error('pageSize can not be below 0')
        }

        this.pageSize = pageSize;

        return this;
    }

    /**
     * Page starts at 1, so this to skip 'X' pages of results
     * @param pageNumber 
     * @returns 
     */
    public setPage(pageNumber: number): this {
        if (pageNumber < 1) {
            throw new Error('pageNumber can not be below 1')
        }

        this.pageNumber = pageNumber;

        return this;
    }

    build(): Pagination {
        return {
            take: this.pageSize,
            skip: (this.pageNumber - 1) * this.pageSize,
        }
    }
}
