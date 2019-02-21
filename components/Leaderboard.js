import PropTypes from 'prop-types';
import Head from 'next/head'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
//import DeleteIcon from '@material-ui/icons/Delete';
import { ApolloProvider, Mutation, Query, graphql, compose } from 'react-apollo';
import { AWSAppSyncClient } from "aws-appsync";
import appSyncConfig from '../appSyncConfig';
import gql from "graphql-tag";

const client = new AWSAppSyncClient(
  { ...appSyncConfig, disableOffline: true },
  { ssrMode: true }
);

const DELETE_USER = gql`
  mutation deletePlayer ($id: ID){
    deletePlayer(id: $id) {
      id
    }
  }
`;

const GET_PLAYERS = gql`
  query getPlayers {
    getPlayers {
     items {
       id
       firstName
       lastName
       score
     }
    }
  }
`;

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, score) {
  id += 1;
  return { id, name, score };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <ApolloProvider client={client}>

      <Query query={GET_PLAYERS} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          let players = data.getPlayers.items;

          return (
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Score</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                      {players.map(p => (
                        <TableRow key={p.id}>
                          <TableCell component="th" scope="row">
                            {`${p.lastName}, ${p.firstName}`}
                          </TableCell>
                          <TableCell align="right">{p.score}</TableCell>
                          <TableCell align="right">
                            <a href='#'>delete</a>
                          </TableCell>
                        </TableRow>
                      ))}

                </TableBody>
              </Table>
            </Paper>
          );
        }}
      </Query>
    </ApolloProvider>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
