import React, { useState, useMemo } from 'react';
import {
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { ChevronDownIcon, MoreHorizontal, Printer } from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
    DropdownMenu,
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
import ExportFunction from '@/components/exports/ExportFunction ';

const rawData = [
    {
        id: 't1',
        invoice: 'INV-1001',
        transactionDate: '2025-06-22',
        customer: { id: 'c1', name: 'Carlo Reyes' },
        washer: { id: 'w1', name: 'Juan Dela Cruz' },
        package: { name: 'Full Wash', price: 200 },
        products: [
            { name: 'Air Freshener', qty: 2, price: 50 },
            { name: 'Shampoo', qty: 1, price: 80 },
        ],
    },
    {
        id: 't2',
        invoice: 'INV-1002',
        transactionDate: '2025-06-23',
        customer: { id: 'c2', name: 'Alexa Uy' },
        washer: { id: 'w2', name: 'Pedro Santos' },
        package: { name: 'Interior Detail', price: 400 },
        products: [],
    },
    {
        id: 't3',
        invoice: 'INV-1003',
        transactionDate: '2025-06-20',
        customer: { id: 'c3', name: 'James Tan' },
        washer: { id: 'w3', name: 'Maria Lopez' },
        package: { name: 'Premium Wash', price: 300 },
        products: [{ name: 'Tire Black', qty: 1, price: 70 }],
    },
    {
        id: 't4',
        invoice: 'INV-1004',
        transactionDate: '2025-06-18',
        customer: { id: 'c4', name: 'Liza Gomez' },
        washer: { id: 'w1', name: 'Juan Dela Cruz' },
        package: { name: 'Quick Wash', price: 150 },
        products: [{ name: 'Engine Detail', qty: 1, price: 200 }],
    },
    {
        id: 't5',
        invoice: 'INV-1005',
        transactionDate: '2025-06-16',
        customer: { id: 'c5', name: 'Noel Javier' },
        washer: { id: 'w2', name: 'Pedro Santos' },
        package: { name: 'Deluxe Wash', price: 250 },
        products: [
            { name: 'Shampoo', qty: 2, price: 80 },
            { name: 'Tire Black', qty: 1, price: 70 },
        ],
    },
    {
        id: 't6',
        invoice: 'INV-1006',
        transactionDate: '2025-06-15',
        customer: { id: 'c6', name: 'Gina Robles' },
        washer: { id: 'w3', name: 'Maria Lopez' },
        package: { name: 'Interior Detail', price: 400 },
        products: [{ name: 'Dashboard Polish', qty: 1, price: 120 }],
    },
    {
        id: 't7',
        invoice: 'INV-1007',
        transactionDate: '2025-06-14',
        customer: { id: 'c7', name: 'Mark Santos' },
        washer: { id: 'w1', name: 'Juan Dela Cruz' },
        package: { name: 'Full Wash', price: 200 },
        products: [],
    },
    {
        id: 't8',
        invoice: 'INV-1008',
        transactionDate: '2025-06-12',
        customer: { id: 'c8', name: 'Cheska Lim' },
        washer: { id: 'w2', name: 'Pedro Santos' },
        package: { name: 'Quick Wash', price: 150 },
        products: [
            { name: 'Shampoo', qty: 1, price: 80 },
            { name: 'Air Freshener', qty: 1, price: 50 },
        ],
    },
    {
        id: 't9',
        invoice: 'INV-1009',
        transactionDate: '2025-06-10',
        customer: { id: 'c9', name: 'Ivan Co' },
        washer: { id: 'w3', name: 'Maria Lopez' },
        package: { name: 'Premium Wash', price: 300 },
        products: [{ name: 'Waxing', qty: 1, price: 200 }],
    },
    {
        id: 't10',
        invoice: 'INV-1010',
        transactionDate: '2025-06-08',
        customer: { id: 'c10', name: 'Rica dela Peña' },
        washer: { id: 'w1', name: 'Juan Dela Cruz' },
        package: { name: 'Deluxe Wash', price: 250 },
        products: [],
    },
];

const columns = [
    {
        accessorKey: 'transactionDate',
        header: 'Transaction Date',
        cell: ({ row }) => (
            <div className='italic'>{row.getValue('transactionDate')}</div>
        ),
    },
    {
        accessorKey: 'invoice',
        header: 'Invoice',
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
        accessorKey: 'description',
        header: 'Item(s)',
        cell: ({ row }) => <div>{row.getValue('description')}</div>,
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
        cell: () => (
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
        ),
    },
];

const OperationsTransactionReport = () => {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);

    const filteredData = useMemo(() => {
        const base =
            !fromDate && !toDate
                ? rawData
                : rawData.filter((item) => {
                      const d = new Date(item.transactionDate);
                      if (fromDate && !toDate) return d >= fromDate;
                      if (!fromDate && toDate) return d <= toDate;
                      if (fromDate && toDate) {
                          const end = new Date(toDate);
                          end.setHours(23, 59, 59, 999);
                          return d >= fromDate && d <= end;
                      }
                      return true;
                  });

        return base.map((item) => {
            const addOnText = item.products
                .map((p) => `${p.name} ×${p.qty}`)
                .join(', ');
            const description =
                `${item.package.name} (Package)` +
                (addOnText ? ` + ${addOnText}` : '');

            const total =
                item.package.price +
                item.products.reduce((sum, p) => sum + p.qty * p.price, 0);

            return {
                id: item.id,
                invoice: item.invoice,
                transactionDate: item.transactionDate,
                customer: item.customer?.name || '',
                washer: item.washer?.name || '',
                description,
                total,
            };
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

    const exportData = [...filteredData];
    if (exportData.length > 0) {
        exportData.push({
            invoice: '',
            transactionDate: '',
            customerName: '',
            washerName: '',
            description: 'GRAND TOTAL',
            total: grandTotal,
        });
    }

    return (
        <div className='globalContainer'>
            <div className='text-2xl font-bold mb-6'>Transaction Report</div>
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
                    <div className='md:ml-auto w-full md:w-auto'>
                        <ExportFunction
                            data={exportData}
                            fileName='Transaction_Report'
                            dateRange={{ from: fromDate, to: toDate }}
                        />
                    </div>
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

export default OperationsTransactionReport;
