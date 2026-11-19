
"use client";

import { useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import type { Area } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AreaSelectorProps {
  areas: Area[];
  value: string;
  onSelect: (value: string) => void;
  onBlur: () => void;
  errors: { message?: string }[];
}

export default function AreaSelector({
  areas,
  value,
  onSelect,
  onBlur,
  errors,
}: AreaSelectorProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 5;

  const filteredAreas = areas.filter((area) => {
    const searchValue = search.toLowerCase();

    return (
      area.name.toLowerCase().includes(searchValue) ||
      area.code.toLowerCase().includes(searchValue)
    );
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAreas.length / PAGE_SIZE),
  );

  const currentAreas = filteredAreas.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const selectedArea = areas.find((area) => area.id === value);

  const isInvalid = errors.length > 0;

  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
    setCurrentPage(1);
  };

  const handleSelect = (area: Area) => {
    onSelect(area.id);
    onBlur();
  };

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel> Select Area </FieldLabel>

      <Input
        placeholder="Search areas by name or code..."
        value={search}
        onChange={(event) => handleSearch(event.target.value)}
        aria-label="Search areas"
      />

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Area Name</TableHead>
              <TableHead>Area Code</TableHead>
              <TableHead className="w-28 text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentAreas.length > 0 ? (
              currentAreas.map((area) => {
                const isSelected = area.id === value;

                return (
                  <TableRow
                    key={area.id}
                    data-state={isSelected ? "selected" : undefined}
                  >
                    <TableCell className="font-medium">
                      {area.name}
                    </TableCell>

                    <TableCell>{area.code}</TableCell>

                    <TableCell className="text-right">
                      <Button
                        type="button"
                        size="sm"
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => handleSelect(area)}
                        aria-pressed={isSelected}
                      >
                        {isSelected ? (
                          <>
                            <Check className="size-4" />
                            Selected
                          </>
                        ) : (
                          "Select"
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="h-24 text-center text-muted-foreground"
                >
                  No area found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Selected feeder information — ID remains hidden */}
      {selectedArea && (
        <p className="text-sm text-muted-foreground">
          Selected area:{" "}
          <span className="font-medium text-foreground">
            {selectedArea.name} ({selectedArea.code})
          </span>
        </p>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          {filteredAreas.length > 0
            ? `Showing ${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(
              currentPage * PAGE_SIZE,
              filteredAreas.length,
            )} of ${filteredAreas.length} areas`
            : "Showing 0 areas"}
        </p>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((page) => page - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="size-4" />
          </Button>

          <span className="text-sm tabular-nums">
            {currentPage} / {totalPages}
          </span>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((page) => page + 1)}
            disabled={currentPage >= totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {isInvalid && <FieldError errors={errors} />}
    </Field>
  );
}