import React, { useState } from 'react';
import {
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    AlertTriangle,
    ArrowUpDown,
    CheckCircle2,
    ChevronDown,
    MoreHorizontal,
    XCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
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
import { CheckCircle2Icon, AlertCircleIcon, XCircleIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const data = [
    {
        id: 'm5gr84i9',
        amount: 316,
        product: 'Foam Cannon',
        price: 29.99,
        stocks: 120,
        dateAdded: '2025-06-01',
    },
    {
        id: '3u1reuv4',
        amount: 242,
        product: 'Microfiber Towel Set',
        price: 19.99,
        stocks: 80,
        dateAdded: '2025-06-03',
    },
    {
        id: 'derv1ws0',
        amount: 837,
        product: 'Car Shampoo',
        price: 49.99,
        stocks: 30,
        dateAdded: '2025-06-05',
    },
    {
        id: '5kma53ae',
        amount: 874,
        product: 'Detailing Brush Kit',
        price: 39.5,
        stocks: 200,
        dateAdded: '2025-06-06',
    },
    {
        id: 'bhqecj4p',
        amount: 721,
        product: 'Tire & Rim Cleaner',
        price: 25.0,
        stocks: 0,
        dateAdded: '2025-06-08',
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
        accessorKey: 'product',
        header: ({ column }) => (
            <Button
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Name
                <ArrowUpDown className='ml-2 h-4 w-4' />
            </Button>
        ),
        cell: ({ row }) => (
            <div className='font-medium'>{row.getValue('product')}</div>
        ),
    },

    {
        accessorKey: 'price',
        header: () => <div>Price</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('price'));
            const formatted = new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP',
            }).format(amount);
            return <div>{formatted}</div>;
        },
    },
    {
        accessorKey: 'stocks',
        header: 'Stocks',
        cell: ({ row }) => (
            <div className='capitalize'>{row.getValue('stocks')}</div>
        ),
    },
    {
        id: 'status',
        header: 'Stock Status',
        cell: ({ row }) => {
            const stock = row.original.stocks;

            if (stock > 50) {
                return (
                    <Badge className='flex items-center gap-1 border-green-400  bg-green-100 text-green-600'>
                        <CheckCircle2 className='h-3 w-3' />
                        In Stock
                    </Badge>
                );
            } else if (stock > 0) {
                return (
                    <Badge className='flex items-center gap-1 border-yellow-400 bg-yellow-50 text-yellow-600 '>
                        <AlertTriangle className='h-3 w-3' />
                        Low Stock
                    </Badge>
                );
            } else {
                return (
                    <Badge className='flex items-center gap-1 border-red-400 bg-red-50 text-red-600'>
                        <XCircle className='h-3 w-3' />
                        Out of Stock
                    </Badge>
                );
            }
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

const ManageProducts = () => {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
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
            <div className='text-2xl font-bold mb-6'>Manage Products</div>
            <div className='flex items-center py-4'>
                <Input
                    placeholder='Filter product...'
                    value={table.getColumn('product')?.getFilterValue() ?? ''}
                    onChange={(event) =>
                        table
                            .getColumn('product')
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

export default ManageProducts;
