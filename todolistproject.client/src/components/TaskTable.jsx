import * as React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper, Switch } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TaskTableToolbar from './TaskTableToolbar';
import TaskTableHeader from './TaskTableHeader.jsx';
import ModalCard from './ModalCard';


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function createData(id, title, description, completed, created) {
    return {
        id,
        title,
        description,
        completed,
        created,
    };
}

const initialRows = [
    createData(1, 'Task 1', 'Task 1 Description', true, '01/01/2000'),
    createData(2, 'Task 2', 'Task 2 Description', false, '02/02/2001'),
    createData(3, 'Task 3', 'Task 3 Description', true, '03/03/2002'),
    createData(4, 'Task 4', 'Task 4 Description', false, '04/04/2003'),
    createData(5, 'Task 5', 'Task 5 Description', true, '05/05/2004'),
    createData(6, 'Task 6', 'Task 6 Description', false, '06/06/2005'),
    createData(7, 'Task 7', 'Task 7 Description', true, '07/07/2006'),
    createData(8, 'Task 8', 'Task 8 Description', false, '08/08/2007'),
    createData(9, 'Task 9', 'Task 9 Description', true, '09/09/2008'),
    createData(10, 'Task 10', 'Task 10 Description', false, '10/10/2009'),
    createData(11, 'Task 11', 'Task 11 Description', true, '11/11/2010'),
    createData(12, 'Task 12', 'Task 12 Description', false, '12/12/2011'),
    createData(13, 'Task 13', 'Task 13 Description', true, '01/01/2012')
];

export default function TaskTable() {
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('created');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState(initialRows);
    const [selectedRow, setSelectedRow] = React.useState(null)
    const [open, setOpen] = React.useState(false);
    const [mode, setMode] = React.useState("Edit");

    const fetchTasks = (filters) => {
        console.log("Fetching with filters: ", filters);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeCompleted = (event, id) => {
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, completed: event.target.checked } : row
            )
        );
    };

    const handleClick = (event, mode, row) => {
        event.stopPropagation();
        setMode(mode);
        setSelectedRow(row);
        setOpen(!open);
    }

    const handleCloseModal = () => {
        setOpen(false);
    }

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            [...rows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, rows],
    );

    return (
        <TableContainer>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TaskTableToolbar onSearch={fetchTasks} />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'small'}
                        >
                            <TaskTableHeader
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, "Details", row)}
                                            key={row.id}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                            >
                                                {row.id + row.title}
                                            </TableCell>
                                            <TableCell >{row.description}</TableCell>
                                            <TableCell ><Switch checked={row.completed} onChange={(event) => handleChangeCompleted(event, row.id)} onClick={(event) => event.stopPropagation()} /></TableCell>
                                            <TableCell >{row.created}</TableCell>
                                            <TableCell >
                                                <>
                                                    <EditIcon onClick={(event) => handleClick(event, "Edit", row)} />
                                                    <DeleteIcon onClick={(event) => handleClick(event, "Delete", row)} />
                                                </>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (33) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <ModalCard open={open} onClose={handleCloseModal} mode={mode} row={selectedRow} onDataChange={fetchTasks} />
            </Box>
        </TableContainer>
        
    );
}
