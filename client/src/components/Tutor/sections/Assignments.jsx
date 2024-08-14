// import { useState, useEffect } from "react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import useAuth from "@/hooks/useAuth";
// import axios from "@/api/axios";

// const Assignments = () => {
//   const { auth } = useAuth();
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const response = await axios.get("/assignments", {
//           headers: { Authorization: `Bearer ${auth.accessToken}` },
//         });
//         setAssignments(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch assignments");
//         setLoading(false);
//       }
//     };

//     fetchAssignments();
//   }, [auth.accessToken]);

//   const filteredAssignments = assignments.filter((assignment) =>
//     auth.specialization.includes(assignment.category)
//   );

//   const renderDocument = (documentPath) => {
//     if (!documentPath) return <p>No document uploaded</p>;

//     // Assuming the document is stored on the same server
//     const fullPath = `http://localhost:3500/${documentPath}`;

//     return (
//       <a href={fullPath} target="_blank" rel="noopener noreferrer">
//         <Button>View Document</Button>
//       </a>
//     );
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Assignments</h1>
//       <Accordion type="single" collapsible className="w-full">
//         {auth.specialization.map((spec, index) => (
//           <AccordionItem value={`item-${index}`} key={index}>
//             <AccordionTrigger>{spec}</AccordionTrigger>
//             <AccordionContent>
//               {filteredAssignments
//                 .filter((assignment) => assignment.category === spec)
//                 .map((assignment) => (
//                   <Card key={assignment._id} className="mb-4">
//                     <CardHeader>
//                       <CardTitle>{assignment.title}</CardTitle>
//                       <CardDescription>
//                         Category: {assignment.category}
//                         <Badge
//                           className="ml-2"
//                           variant={
//                             assignment.status === "pending"
//                               ? "destructive"
//                               : "default"
//                           }
//                         >
//                           {assignment.status}
//                         </Badge>
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <p>
//                         <strong>Description:</strong> {assignment.description}
//                       </p>
//                       <p>
//                         <strong>Proposed Budget:</strong> $
//                         {assignment.proposedBudget}
//                       </p>
//                       <p>
//                         <strong>Due Date:</strong>{" "}
//                         {new Date(assignment.dueDate).toLocaleDateString()}
//                       </p>
//                       <p>
//                         <strong>Student:</strong> {assignment.student.username}
//                       </p>
//                       {renderDocument(assignment.documents)}
//                     </CardContent>
//                     <CardFooter>
//                       <Button>Accept Assignment</Button>
//                     </CardFooter>
//                   </Card>
//                 ))}
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     </div>
//   );
// };

// export default Assignments;

import React, { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import useAuth from "@/hooks/useAuth";
import axios from "@/api/axios";

const Assignments = () => {
  const { auth } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get("/assignments", {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        });
        setAssignments(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch assignments");
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [auth.accessToken]);

  const columns = [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <div>{row.getValue("category")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={
            row.getValue("status") === "pending" ? "destructive" : "default"
          }
        >
          {row.getValue("status")}
        </Badge>
      ),
    },
    {
      accessorKey: "proposedBudget",
      header: () => <div className="text-right">Budget</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("proposedBudget"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      cell: ({ row }) => (
        <div>{new Date(row.getValue("dueDate")).toLocaleDateString()}</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const assignment = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  window.alert(`View details of ${assignment.title}`)
                }
              >
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  window.alert(`Accept assignment: ${assignment.title}`)
                }
              >
                Accept Assignment
              </DropdownMenuItem>
              {assignment.documents && (
                <DropdownMenuItem
                  onClick={() =>
                    window.open(
                      `http://localhost:3500/${assignment.documents}`,
                      "_blank"
                    )
                  }
                >
                  View Document
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const filteredAssignments = assignments.filter(
    (assignment) =>
      selectedSpecialization === "All" ||
      assignment.category === selectedSpecialization
  );

  const table = useReactTable({
    data: filteredAssignments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Assignments</h1>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter assignments..."
          value={table.getColumn("title")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Specialization <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSelectedSpecialization("All")}>
              All
            </DropdownMenuItem>
            {auth.specialization.map((spec) => (
              <DropdownMenuItem
                key={spec}
                onClick={() => setSelectedSpecialization(spec)}
              >
                {spec}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Assignments;
