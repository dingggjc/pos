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

const data = [
    {
        addOnsName: 'Ultimate Foam Kit',
        category: 'Exterior',
        product: 'Foam Cannon',
        price: 29.99,
        dateAdded: '2025-06-01',
    },
    {
        addOnsName: 'Towel Pro Pack',
        category: 'Interior',
        product: 'Microfiber Towel Set',
        price: 19.99,
        dateAdded: '2025-06-03',
    },
    {
        addOnsName: 'Shampoo Supreme',
        category: 'Exterior',
        product: 'Car Shampoo',
        price: 49.99,
        dateAdded: '2025-06-05',
    },
    {
        addOnsName: 'Brush Essentials',
        category: 'Detailing Tools',
        product: 'Detailing Brush Kit',
        price: 39.5,
        dateAdded: '2025-06-06',
    },
    {
        addOnsName: 'Tire Spark Pack',
        category: 'Wheels & Tires',
        product: 'Tire & Rim Cleaner',
        price: 25.0,
        dateAdded: '2025-06-08',
    },
    {
        addOnsName: 'Brush & Shine',
        category: 'Wheels & Tires',
        product: 'Wheel Brush',
        price: 15.99,
        dateAdded: '2025-06-09',
    },
    {
        addOnsName: 'Smooth Surface Kit',
        category: 'Exterior',
        product: 'Clay Bar Kit',
        price: 34.99,
        dateAdded: '2025-06-10',
    },
    {
        addOnsName: 'Headlight Hero',
        category: 'Restoration',
        product: 'Headlight Restorer',
        price: 22.5,
        dateAdded: '2025-06-11',
    },
    {
        addOnsName: 'Fresh Cabin',
        category: 'Interior',
        product: 'Interior Cleaner',
        price: 18.99,
        dateAdded: '2025-06-12',
    },
    {
        addOnsName: 'Leather Luxe',
        category: 'Interior',
        product: 'Leather Conditioner',
        price: 27.5,
        dateAdded: '2025-06-13',
    },
    {
        addOnsName: 'Shine Pads Set',
        category: 'Accessories',
        product: 'Wax Applicator Pads',
        price: 12.99,
        dateAdded: '2025-06-14',
    },
    {
        addOnsName: 'Quick Dry Duo',
        category: 'Exterior',
        product: 'Drying Towel',
        price: 24.99,
        dateAdded: '2025-06-15',
    },
    {
        addOnsName: 'Trim Revive Kit',
        category: 'Restoration',
        product: 'Trim Restorer',
        price: 16.5,
        dateAdded: '2025-06-16',
    },
    {
        addOnsName: 'Crystal View',
        category: 'Glass',
        product: 'Glass Cleaner',
        price: 14.99,
        dateAdded: '2025-06-17',
    },
    {
        addOnsName: 'Pressure Pro',
        category: 'Exterior',
        product: 'Pressure Washer',
        price: 199.99,
        dateAdded: '2025-06-18',
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
        accessorKey: 'addOnsName',
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
            <div className='font-medium'>{row.getValue('addOnsName')}</div>
        ),
    },
    {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => (
            <div className='capitalize'>{row.getValue('category')}</div>
        ),
    },

    {
        accessorKey: 'product',
        header: 'Product',
        cell: ({ row }) => (
            <div className='capitalize'>{row.getValue('product')}</div>
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

const ManageAddOns = () => {
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
            <div className='text-2xl font-bold mb-6'>Manage Add Ons</div>
            <div className='flex items-center py-4'>
                <Input
                    placeholder='Filter Packages...'
                    value={
                        table.getColumn('addOnsName')?.getFilterValue() ?? ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('addOnsName')
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

export default ManageAddOns;
