import React from 'react';
import axios from './node_modules/axios';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.common.gray,
        },
    },
}))(TableRow);
export default class PersonList extends React.Component {
    state = {
        persons: []
    }

    componentDidMount() {
        axios.get(`https://covidtracking.com/api/states`, {})
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
            })
    }

    render() {
        return (


            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableCell component="th" scope="row"><b>State</b></TableCell>
                        <TableCell align="center">Positive</TableCell>
                        <TableCell align="center">Negative</TableCell>
                        <TableCell align="center">Currently Hospitalized</TableCell>
                        <TableCell align="center">Deaths</TableCell>
                    </TableHead>
                    {this.state.persons.map(corona =>
                        <TableBody>
                            <StyledTableRow key={corona.state}>
                                <StyledTableCell component="th" scope="row"><b>{corona.state}</b></StyledTableCell>
                                <StyledTableCell align="center">{corona.positive}</StyledTableCell>
                                <StyledTableCell align="center">{corona.negative}</StyledTableCell>
                                <StyledTableCell align="center">{corona.hospitalizedCurrently}</StyledTableCell>
                                <StyledTableCell align="center">{corona.death}</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
        )
    }
}
