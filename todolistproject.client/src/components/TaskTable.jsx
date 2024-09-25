import { useState, useEffect, useMemo } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper, Switch, Alert } from '@mui/material';
import { DeleteIcon, EditIcon } from '@mui/icons-material';
import TaskTableToolbar from './TaskTableToolbar';
import TaskTableHeader from './TaskTableHeader.jsx';
import ModalCard from './ModalCard';
import { getAllTasks, putTask } from '../utils/APIService';
import { getComparator, formatDate } from '../utils/HelperFunctions.jsx'


export default function TaskTable() {
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('createdAt');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null)
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("Edit");
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        fetchTasks(null)
    },[])

    const fetchTasks = (filters) => {
        getAllTasks(filters)
            .then(response => {
                if (response.status === 200 || response.status === 204) {
                    const formattedData = response.data.map(task => ({
                        ...task,
                        userReadableDate: formatDate(task.createdAt)
                    }))
                    setRows(formattedData);
            } })
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
        let changedTask = rows.find(t => t.id === id);
        changedTask = {...changedTask, isCompleted: event.target.checked };
        putTask(id, changedTask)
            .then(response => {
                if (response.status === 200) {
                    setAlert({ message: "Task updated successfully!", type: "success" })
                    setRows((prevRows) =>
                        prevRows.map((row) =>
                            row.id === id ? { ...response.data, userReadableDate: formatDate(response.data.createdAt) } : row
                        )
                    );
                }
            })
            .catch(error => {
                if (error.response) {
                    setAlert({ message: `Error: ${error.response.data}`, type: "error" });
                } else if (error.request) {
                    setAlert({ message: "Error: No response from the server", type: "error" });
                } else {
                    setAlert({ message: `Error: ${error.message}`, type: "error" });
                }
            });
        const timeoutId = setTimeout(() => {
            setAlert(null);
        }, 3000);
        return () => clearTimeout(timeoutId);
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

    const visibleRows = useMemo(
        () =>
            [...rows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, rows],
    );

    const handleDataChange = (filter) => {
        fetchTasks(filter);
        handleCloseModal();
    }

    return (
        <TableContainer>
            {alert && <Alert severity={alert.type}>{alert.message}</Alert>}
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TaskTableToolbar onSearch={(filters) => fetchTasks(filters)} onDataChange={fetchTasks} />
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
                                                {row.title}
                                            </TableCell>
                                            <TableCell >{row.description}</TableCell>
                                            <TableCell ><Switch checked={row.isCompleted} onChange={(event) => handleChangeCompleted(event, row.id)} onClick={(event) => event.stopPropagation()} /></TableCell>
                                            <TableCell >{row.userReadableDate}</TableCell>
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
                <ModalCard open={open} onClose={handleCloseModal} mode={mode} row={selectedRow} onDataChange={handleDataChange} />
            </Box>
        </TableContainer>
        
    );
}
