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
import type { Technician } from "@/types";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type TechnicianSelectorProps = {
  technicians: Technician[];
  value: string;
  onSelect: (technicianId: string) => void;
  onBlur: () => void;
  errors: { message?: string }[];
};

export default function TechnicianSelector({
  technicians,
  value,
  onSelect,
  onBlur,
  errors,
}: TechnicianSelectorProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 5;

  const filteredTechnicians = technicians.filter((technician) => {
    const searchValue = search.toLowerCase();

    return (
      technician.name.toLowerCase().includes(searchValue) ||
      technician.email.toLowerCase().includes(searchValue)
    );
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTechnicians.length / PAGE_SIZE),
  );

  const currentTechnicians = filteredTechnicians.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const selectedTechnician = technicians.find((technician) => technician.id === value);

  const isInvalid = errors.length > 0;

  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
    setCurrentPage(1);
  };

  const handleSelect = (technician: Technician) => {
    onSelect(technician.id);
    onBlur();
  };

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel> Select Available Technician </FieldLabel>

      <Input
        placeholder="Search technicians by name or email..."
        value={search}
        onChange={(event) => handleSearch(event.target.value)}
        aria-label="Search technicians"
      />

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-28 text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentTechnicians.length > 0 ? (
              currentTechnicians.map((technician) => {
                const isSelected = technician.id === value;

                return (
                  <TableRow
                    key={technician.id}
                    data-state={isSelected ? "selected" : undefined}
                  >
                    <TableCell className="font-medium">
                      {technician.name}
                    </TableCell>

                    <TableCell>{technician.email}</TableCell>

                    <TableCell className="text-right">
                      <Button
                        type="button"
                        size="sm"
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => handleSelect(technician)}
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
                  No technician found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Selected feeder information — ID remains hidden */}
      {selectedTechnician && (
        <p className="text-sm text-muted-foreground">
          Selected feeder:{" "}
          <span className="font-medium text-foreground">
            {selectedTechnician.name} ({selectedTechnician.email})
          </span>
        </p>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          {filteredTechnicians.length > 0
            ? `Showing ${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(
              currentPage * PAGE_SIZE,
              filteredTechnicians.length,
            )} of ${filteredTechnicians.length} feeders`
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