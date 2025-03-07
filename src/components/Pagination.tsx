"use client"
import { Pagination as MuiPagination, PaginationItem } from "@mui/material"
import { ChevronLeft, ChevronRight } from "lucide-react"

type PaginationProps = {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
    return (
        <MuiPagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => onPageChange(page)}
            siblingCount={2}
            boundaryCount={1}
            renderItem={(item) => <PaginationItem slots={{ previous: ChevronLeft, next: ChevronRight }} {...item} />}
        />
    )
}

