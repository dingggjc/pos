import React, { useState } from 'react';
import {
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const data = [
    {
        id: 'm5gr84i9',
        category: 'Medium',
        dateAdded: '2025-06-01',
        carTypes: ['Sedan', 'SUV'],
    },
    {
        id: '3u1reuv4',
        category: 'Compact',
        dateAdded: '2025-06-03',
        carTypes: ['SUV', 'Hatchback', 'Crossover'],
    },
    {
        id: 'derv1ws0',
        category: 'Mixed Size',
        dateAdded: '2025-06-05',
        carTypes: ['Sedan', 'Truck', 'Hatchback', 'Coupe', 'Van'],
    },
    {
        id: '5kma53ae',
        category: 'Family',
        dateAdded: '2025-06-06',
        carTypes: ['Van', 'Wagon', 'Convertible'],
    },
    {
        id: 'bhqecj4p',
        category: 'All Vehicle Types',
        dateAdded: '2025-06-08',
        carTypes: [
            'Sedan',
            'SUV',
            'Truck',
            'Van',
            'Hatchback',
            'Convertible',
            'Coupe',
            'Wagon',
            'Jeep',
            'Pickup',
            'Crossover',
            'Mini',
            'Luxury',
            'Sports Car',
            'Electric',
        ],
    },
    {
        id: 'xe8qztl1',
        category: 'City Ride',
        dateAdded: '2025-06-09',
        carTypes: ['Sedan', 'Electric', 'Mini'],
    },
    {
        id: 't8r2wzx0',
        category: 'Premium Class',
        dateAdded: '2025-06-10',
        carTypes: ['Luxury', 'Coupe', 'Convertible', 'Sports Car'],
    },
    {
        id: 'p3l7nvv5',
        category: 'Outdoor Utility',
        dateAdded: '2025-06-11',
        carTypes: ['SUV', 'Crossover', 'Jeep', 'Pickup'],
    },
    {
        id: 'k1f9umw7',
        category: 'Heavy Duty',
        dateAdded: '2025-06-12',
        carTypes: ['Truck', 'SUV', 'Van', 'Jeep'],
    },
    {
        id: 'b2r0cgf6',
        category: 'Urban Small',
        dateAdded: '2025-06-13',
        carTypes: ['Sedan', 'Hatchback', 'Mini', 'Luxury'],
    },
];

const columns = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label='Select all'
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label='Select row'
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: 'category',
        header: ({ column }) => (
            <Button
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Category Name
                <ArrowUpDown className='ml-2 h-4 w-4' />
            </Button>
        ),
        cell: ({ row }) => (
            <div className='font-medium'>{row.getValue('category')}</div>
        ),
    },

    {
        id: 'carTypes',
        header: 'Car Types',
        accessorFn: (row) => row.carTypes.join(', '),
        cell: ({ row }) => {
            const carTypes = row.original.carTypes;
            const visible = carTypes.slice(0, 4);
            const remaining = carTypes.length - visible.length;

            return (
                <div className='flex flex-wrap gap-1 max-w-[300px]'>
                    {visible.map((type) => (
                        <Badge
                            key={type}
                            className='flex items-center gap-1 border bg-purple-200 text-purple-500'
                        >
                            {type}
                        </Badge>
                    ))}

                    {remaining > 0 && (
                        <Badge className='border bg-purple-200 text-purple-500'>
                            +{remaining} more
                        </Badge>
                    )}
                </div>
            );
        },
        filterFn: (row, id, filterValue) => {
            if (!filterValue) return true;
            return row.original.carTypes.some((type) =>
                type.toLowerCase().includes(filterValue.toLowerCase())
            );
        },
    },

    {
        accessorKey: 'dateAdded',
        header: ' Date Added',
        cell: ({ row }) => (
            <div className='italic'>{row.getValue('dateAdded')}</div>
        ),
    },

    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(payment.id)
                            }
                        >
                            Add Product
                        </DropdownMenuItem>
                        {/* <DropdownMenuSeparator /> */}
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className='text-red-600'>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const ServicesCategories = () => {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
        initialState: {
            pagination: {
                pageSize: 10,
                pageIndex: 0,
            },
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className='globalContainer'>
            <div className='text-2xl font-bold mb-6'>Manage Categories</div>
            <div className='flex items-center py-4'>
                <Input
                    placeholder='Filter Car Type ...'
                    value={table.getColumn('carTypes')?.getFilterValue() ?? ''}
                    onChange={(event) =>
                        table
                            .getColumn('carTypes')
                            ?.setFilterValue(event.target.value)
                    }
                    className='max-w-sm'
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' className='ml-auto'>
                            Columns <ChevronDown className='ml-2 h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className='capitalize'
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className='rounded-md border'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : typeof header.column.columnDef
                                                  .header === 'function'
                                            ? header.column.columnDef.header(
                                                  header.getContext()
                                              )
                                            : header.column.columnDef.header}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {cell.column.columnDef.cell(
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
                                    className='h-24 text-center'
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className='flex items-center justify-end space-x-2 py-4'>
                <div className='text-muted-foreground flex-1 text-sm'>
                    {table.getFilteredSelectedRowModel().rows.length} of{' '}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className='space-x-2'>
                    <Button
                        variant='outline'
                        size='sm'
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant='outline'
                        size='sm'
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ServicesCategories;
