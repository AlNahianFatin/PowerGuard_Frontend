import {
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import type { Feeder } from "@/types";
// import { Field } from "@tanstack/react-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FeederSelectorProps = {
  feeders: Feeder[];
  value: string;
  onSelect: (feederId: string) => void;
  onBlur: () => void;
  errors: { message?: string }[];
};

export default function FeederSelector({
  feeders,
  value,
  onSelect,
  onBlur,
  errors,
}: FeederSelectorProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 5;

  const filteredFeeders = feeders.filter((feeder) => {
    const searchValue = search.toLowerCase();

    return (
      feeder.name.toLowerCase().includes(searchValue) ||
      feeder.code.toLowerCase().includes(searchValue)
    );
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredFeeders.length / PAGE_SIZE),
  );

  const currentFeeders = filteredFeeders.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const selectedFeeder = feeders.find((feeder) => feeder.id === value);

  const isInvalid = errors.length > 0;

  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
    setCurrentPage(1);
  };

  const handleSelect = (feeder: Feeder) => {
    onSelect(feeder.id);
    onBlur();
  };

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel> Select Feeder </FieldLabel>

      <Input
        placeholder="Search feeders by name or code..."
        value={search}
        onChange={(event) => handleSearch(event.target.value)}
        aria-label="Search feeders"
      />

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Feeder Name</TableHead>
              <TableHead>Feeder Code</TableHead>
              <TableHead className="w-28 text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentFeeders.length > 0 ? (
              currentFeeders.map((feeder) => {
                const isSelected = feeder.id === value;

                return (
                  <TableRow
                    key={feeder.id}
                    data-state={isSelected ? "selected" : undefined}
                  >
                    <TableCell className="font-medium">
                      {feeder.name}
                    </TableCell>

                    <TableCell>{feeder.code}</TableCell>

                    <TableCell className="text-right">
                      <Button
                        type="button"
                        size="sm"
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => handleSelect(feeder)}
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
                  No feeders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Selected feeder information — ID remains hidden */}
      {selectedFeeder && (
        <p className="text-sm text-muted-foreground">
          Selected feeder:{" "}
          <span className="font-medium text-foreground">
            {selectedFeeder.name} ({selectedFeeder.code})
          </span>
        </p>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          {filteredFeeders.length > 0
            ? `Showing ${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(
              currentPage * PAGE_SIZE,
              filteredFeeders.length,
            )} of ${filteredFeeders.length} feeders`
            : "Showing 0 feeders"}
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