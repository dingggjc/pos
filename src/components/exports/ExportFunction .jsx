import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download, FileText, Sheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ExportFunction = ({ data, fileName, dateRange }) => {
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        if (dateRange.from || dateRange.to) {
            const fromText = dateRange.from
                ? dateRange.from.toLocaleDateString()
                : 'Start';
            const toText = dateRange.to
                ? dateRange.to.toLocaleDateString()
                : 'End';
            XLSX.utils.sheet_add_aoa(
                worksheet,
                [[`Date Range: ${fromText} to ${toText}`]],
                { origin: -1 }
            );
        }
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(`${fileName} Report`, 14, 15);
        doc.setFontSize(10);

        if (dateRange.from || dateRange.to) {
            const fromText = dateRange.from
                ? dateRange.from.toLocaleDateString()
                : 'Start';
            const toText = dateRange.to
                ? dateRange.to.toLocaleDateString()
                : 'End';
            doc.text(`Date Range: ${fromText} to ${toText}`, 14, 22);
            doc.text(
                `Generated on: ${new Date().toLocaleDateString()}`,
                14,
                29
            );
        } else {
            doc.text(
                `Generated on: ${new Date().toLocaleDateString()}`,
                14,
                22
            );
        }

        const headers = Object.keys(data[0]).map((header) =>
            header
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase())
        );

        const tableData = data.map((item) =>
            Object.values(item).map((value) => {
                if (typeof value === 'number') {
                    return `₱ ${value.toFixed(2)}`;
                }
                return value;
            })
        );

        autoTable(doc, {
            head: [headers],
            body: tableData,
            startY: dateRange.from || dateRange.to ? 35 : 28,
            styles: {
                fontSize: 8,
                cellPadding: 3,
                overflow: 'linebreak',
            },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontStyle: 'bold',
            },
            columnStyles: {
                0: { cellWidth: 25 },
                1: { cellWidth: 30 },
                2: { cellWidth: 'auto' },
                3: { cellWidth: 20 },
                4: { cellWidth: 25 },
            },
        });

        doc.save(`${fileName}.pdf`);
    };

    const exportToCSV = () => {
        let csvContent = [];
        if (dateRange.from || dateRange.to) {
            const fromText = dateRange.from
                ? dateRange.from.toLocaleDateString()
                : 'Start';
            const toText = dateRange.to
                ? dateRange.to.toLocaleDateString()
                : 'End';
            csvContent.push(`# Date Range: ${fromText} to ${toText}`);
        }

        csvContent.push(Object.keys(data[0]).join(','));
        csvContent.push(
            ...data.map((item) =>
                Object.values(item)
                    .map((value) =>
                        typeof value === 'string' && value.includes(',')
                            ? `"${value}"`
                            : value
                    )
                    .join(',')
            )
        );

        const blob = new Blob([csvContent.join('\n')], {
            type: 'text/csv;charset=utf-8;',
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileName}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='default' className='flex gap-2'>
                    <Download className='h-4 w-4' />
                    Export Report
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={exportToExcel}>
                    <Sheet className='mr-2 h-4 w-4' />
                    Export to Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportToPDF}>
                    <FileText className='mr-2 h-4 w-4' />
                    Export to PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportToCSV}>
                    <FileText className='mr-2 h-4 w-4' />
                    Export to CSV
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ExportFunction;
