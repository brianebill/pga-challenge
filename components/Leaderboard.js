import PropTypes from 'prop-types';
import Head from 'next/head'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { ApolloProvider, Mutation, Query, graphql, compose } from 'react-apollo';
import { AWSAppSyncClient } from "aws-appsync";
import appSyncConfig from '../appSyncConfig';
import gql from "graphql-tag";
import fetch from 'node-fetch'
import sortPlayers from '../functions/sortPlayers'

if (!process.browser) { global.fetch = fetch }

const client = new AWSAppSyncClient(
  { ...appSyncConfig, disableOffline: true },
  { ssrMode: true }
);

const DELETE_PLAYER = gql`
  mutation deletePlayer ($id: ID!){
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
    maxWidth: '997px',
    margin: 'auto',
    overflowX: 'auto',
  },
  table: {
    minWidth: 400
  },
});

const Delete = styled.a`
  cursor: pointer;
`;

function SimpleTable(props) {
  const { classes } = props;

  return (
    <ApolloProvider client={client}>

      <Query query={GET_PLAYERS}>
        {({ loading, error, data }) => {
          if (loading) return (<p style={{ textAlign: 'center' }}>"Loading..."</p>)
          if (error) return `Error! ${error.message}`;
          let players = data.getPlayers.items;
          let sortedPlayers = players.sort(sortPlayers);

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
                        <TableRow key={p.id} id={p.id}>
                          <TableCell component="th" scope="row">
                            {`${p.lastName}, ${p.firstName}`}
                          </TableCell>
                          <TableCell align="right">{p.score}</TableCell>
                          <TableCell align="right">

                          <Mutation mutation={DELETE_PLAYER}>
                            {(deletePlayer, { data }) => (
                              <Delete onClick={
                                async () => {
                                  await deletePlayer({ variables: { id: p.id }})
                                  let el = document.getElementById(p.id)
                                  el.parentNode.removeChild(el)
                                }
                              }>
                                <DeleteIcon />
                              </Delete>
                            )}
                          </Mutation>

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
