import React, { useState, useMemo } from 'react';
import {
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    ArrowUpDown,
    ChevronDown,
    ChevronDownIcon,
    MoreHorizontal,
    Printer,
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
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

const data = [
    {
        id: 't1',
        invoice: 'INV-1001',
        customer: 'Carlos Dela Cruz',
        washer: 'John Santos',
        transactionDate: '2025-06-01',
        total: '300',
    },
    {
        id: 't2',
        invoice: 'INV-1002',
        customer: 'Angela Ramirez',
        washer: 'Maria Lopez',
        transactionDate: '2025-06-05',
        total: '150',
    },
    {
        id: 't3',
        invoice: 'INV-1003',
        customer: 'Marco Villanueva',
        washer: 'Kevin Reyes',
        transactionDate: '2025-06-10',
        total: '500',
    },
    {
        id: 't4',
        invoice: 'INV-1004',
        customer: 'Elena Soriano',
        washer: 'Jenny Cruz',
        transactionDate: '2025-06-13',
        total: '450',
    },
    {
        id: 't5',
        invoice: 'INV-1005',
        customer: 'Luis Mendoza',
        washer: 'John Santos',
        transactionDate: '2025-06-17',
        total: '200',
    },
    {
        id: 't6',
        invoice: 'INV-1006',
        customer: 'Grace Bautista',
        washer: 'Maria Lopez',
        transactionDate: '2025-06-18',
        total: '350',
    },
    {
        id: 't7',
        invoice: 'INV-1007',
        customer: 'Nathaniel Cruz',
        washer: 'Kevin Reyes',
        transactionDate: '2025-06-20',
        total: '400',
    },
    {
        id: 't8',
        invoice: 'INV-1008',
        customer: 'Bianca Gutierrez',
        washer: 'Jenny Cruz',
        transactionDate: '2025-06-21',
        total: '275',
    },
    {
        id: 't9',
        invoice: 'INV-1009',
        customer: 'Paolo Morales',
        washer: 'John Santos',
        transactionDate: '2025-06-22',
        total: '325',
    },
    {
        id: 't10',
        invoice: 'INV-1010',
        customer: 'Trisha Lim',
        washer: 'Maria Lopez',
        transactionDate: '2025-06-23',
        total: '180',
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
        accessorKey: 'invoice',
        header: ({ column }) => (
            <Button
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Invoice
                <ArrowUpDown className='ml-2 h-4 w-4' />
            </Button>
        ),
        cell: ({ row }) => (
            <div className='font-medium'>{row.getValue('invoice')}</div>
        ),
    },
    {
        accessorKey: 'customer',
        header: 'Customer',
        cell: ({ row }) => <div>{row.getValue('customer')}</div>,
    },
    {
        accessorKey: 'washer',
        header: 'Washer',
        cell: ({ row }) => <div>{row.getValue('washer')}</div>,
    },
    {
        accessorKey: 'transactionDate',
        header: 'Transaction Date',
        cell: ({ row }) => (
            <div className='italic'>{row.getValue('transactionDate')}</div>
        ),
    },
    {
        accessorKey: 'total',
        header: 'Total',
        cell: ({ row }) => (
            <div className='italic'>₱ {row.getValue('total')}</div>
        ),
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: () => {
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
                        <DropdownMenuItem>View</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const OperationsSalesReport = () => {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);

    const filteredData = useMemo(() => {
        if (!fromDate && !toDate) return data;

        return data.filter((item) => {
            const transactionDate = new Date(item.transactionDate);

            if (fromDate && !toDate) {
                return transactionDate >= fromDate;
            }

            if (!fromDate && toDate) {
                return transactionDate <= toDate;
            }

            if (fromDate && toDate) {
                const endOfDay = new Date(toDate);
                endOfDay.setHours(23, 59, 59, 999);
                return (
                    transactionDate >= fromDate && transactionDate <= endOfDay
                );
            }

            return true;
        });
    }, [fromDate, toDate]);

    const grandTotal = useMemo(() => {
        return filteredData.reduce((sum, item) => sum + Number(item.total), 0);
    }, [filteredData]);

    const table = useReactTable({
        data: filteredData,
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

    const clearDateFilters = () => {
        setFromDate(null);
        setToDate(null);
    };

    return (
        <div className='globalContainer'>
            <div className='text-2xl font-bold mb-6'>Sales Report</div>
            <div className='flex flex-col md:flex-row items-center gap-4 py-4'>
                <Input
                    placeholder='Search for Invoice ...'
                    value={table.getColumn('invoice')?.getFilterValue() ?? ''}
                    onChange={(event) =>
                        table
                            .getColumn('invoice')
                            ?.setFilterValue(event.target.value)
                    }
                    className='w-full md:max-w-sm'
                />

                <div className='flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto'>
                    <div className='w-full sm:w-auto'>
                        <Popover open={openFrom} onOpenChange={setOpenFrom}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant='outline'
                                    id='date-from'
                                    className='w-full justify-between font-normal'
                                >
                                    {fromDate
                                        ? fromDate.toLocaleDateString()
                                        : 'From date'}
                                    <ChevronDownIcon className='ml-2' />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className='w-auto p-0'
                                align='start'
                            >
                                <Calendar
                                    mode='single'
                                    selected={fromDate}
                                    onSelect={(date) => {
                                        setFromDate(date);
                                        setOpenFrom(false);
                                        if (toDate && date > toDate) {
                                            setToDate(null);
                                        }
                                    }}
                                    disabled={(date) =>
                                        toDate ? date > toDate : false
                                    }
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <Label className='px-2 self-center'>To</Label>

                    <div className='w-full sm:w-auto'>
                        <Popover open={openTo} onOpenChange={setOpenTo}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant='outline'
                                    id='date-to'
                                    className='w-full justify-between font-normal'
                                >
                                    {toDate
                                        ? toDate.toLocaleDateString()
                                        : 'To date'}
                                    <ChevronDownIcon className='ml-2' />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className='w-auto p-0'
                                align='start'
                            >
                                <Calendar
                                    mode='single'
                                    selected={toDate}
                                    onSelect={(date) => {
                                        setToDate(date);
                                        setOpenTo(false);
                                        if (fromDate && date < fromDate) {
                                            setFromDate(null);
                                        }
                                    }}
                                    disabled={(date) =>
                                        fromDate ? date < fromDate : false
                                    }
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {(fromDate || toDate) && (
                        <Button
                            variant='ghost'
                            onClick={clearDateFilters}
                            className='text-sm'
                        >
                            Clear dates
                        </Button>
                    )}
                </div>
                <div className='md:ml-auto w-full md:w-auto'>
                    <Button
                        variant='default'
                        className='flex w-full md:w-auto justify-center gap-2'
                    >
                        <Printer className='h-4 w-4' />
                        Print Report
                    </Button>
                </div>
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
                            <>
                                {table.getRowModel().rows.map((row) => (
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
                                ))}
                                <TableRow className='bg-muted/50'>
                                    <TableCell
                                        colSpan={5}
                                        className='text-right font-bold'
                                    >
                                        Grand Total:
                                    </TableCell>
                                    <TableCell className='font-bold italic'>
                                        ₱ {grandTotal.toLocaleString()}
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </>
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

export default OperationsSalesReport;
