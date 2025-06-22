import React, { useState } from 'react';
import {
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    ArrowUpDown,
    CheckCircle,
    ChevronDown,
    MoreHorizontal,
    PauseCircle,
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
        id: 'w1',
        name: 'John Santos',
        shift: '8 AM - 5 PM',
        status: 'Active',
        assignedToday: 3,
        dateHired: '2023-01-10',
    },
    {
        id: 'w2',
        name: 'Maria Lopez',
        shift: '9 AM - 6 PM',
        status: 'On Leave',
        assignedToday: 0,
        dateHired: '2022-11-05',
    },
    {
        id: 'w3',
        name: 'Kevin Reyes',
        shift: '10 AM - 7 PM',
        status: 'Active',
        assignedToday: 1,
        dateHired: '2021-03-21',
    },
    {
        id: 'w4',
        name: 'Jenny Cruz',
        shift: '8 AM - 5 PM',
        status: 'Resigned',
        assignedToday: 0,
        dateHired: '2020-06-15',
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
        accessorKey: 'name',
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
            <div className='font-medium'>{row.getValue('name')}</div>
        ),
    },
    {
        accessorKey: 'assignedToday',
        header: 'Assigned Today',
        cell: ({ row }) => <div>{row.getValue('assignedToday')}</div>,
    },

    {
        id: 'available',
        header: 'Available',
        cell: ({ row }) => {
            const status = row.getValue('status');
            const free = status === 'Active';

            const icon = free ? (
                <CheckCircle className='w-4 h-4 mr-1' />
            ) : (
                <XCircle className='w-4 h-4 mr-1' />
            );

            return (
                <Badge
                    className={`inline-flex items-center gap-1 border ${
                        free
                            ? 'bg-blue-200 text-blue-700'
                            : 'bg-muted text-muted-foreground'
                    }`}
                >
                    {icon}
                    {free ? 'Yes' : 'No'}
                </Badge>
            );
        },
        enableSorting: false,
    },

    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status');

            let color = '';
            let icon = null;

            if (status === 'Active') {
                color = 'bg-green-200 text-green-700';
                icon = <CheckCircle className='w-4 h-4 mr-1' />;
            } else if (status === 'On Leave') {
                color = 'bg-yellow-200 text-yellow-700';
                icon = <PauseCircle className='w-4 h-4 mr-1' />;
            } else {
                color = 'bg-red-200 text-red-700';
                icon = <XCircle className='w-4 h-4 mr-1' />;
            }

            return (
                <Badge
                    className={`inline-flex items-center gap-1 border ${color}`}
                >
                    {icon}
                    {status}
                </Badge>
            );
        },
    },

    {
        accessorKey: 'dateHired',
        header: 'Date Hired',
        cell: ({ row }) => (
            <div className='italic'>{row.getValue('dateHired')}</div>
        ),
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const staff = row.original;
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
                                navigator.clipboard.writeText(staff.id)
                            }
                        >
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className='text-red-600'>
                            Terminate
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const OperationsStaffManagement = () => {
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
            <div className='text-2xl font-bold mb-6'>Manage Staff</div>
            <div className='flex items-center py-4'>
                <Input
                    placeholder='Search for Name ...'
                    value={table.getColumn('name')?.getFilterValue() ?? ''}
                    onChange={(event) =>
                        table
                            .getColumn('name')
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

export default OperationsStaffManagement;
