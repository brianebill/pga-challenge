import { useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { ApolloProvider, Mutation, Query, graphql, compose } from 'react-apollo'
import { AWSAppSyncClient } from "aws-appsync"
import appSyncConfig from '../appSyncConfig'
import gql from "graphql-tag"
import fetch from 'node-fetch'

if (!process.browser) { global.fetch = fetch }

const client = new AWSAppSyncClient(
  { ...appSyncConfig, disableOffline: true },
  { ssrMode: true }
);

const POST_PLAYER = gql`
  mutation postPlayer($firstName: String!, $lastName: String!, $score: Int!) {
    postPlayer(firstName: $firstName, lastName: $lastName, score: $score) {
     id
     firstName
     lastName
     score
    }
  }
`;

const AddPlayer = styled.div`
  margin: auto;
  width: 300px;
  font-family: 'Roboto', sans-serif;
`;

const Form = styled.form`
  padding: 0 0 0 20px;
`;

const In = styled.input`
  width: 100%;
  height: 30px;
  margin: 0 0 8px 0;
  padding: 0 5px;
  font-size: 16px;
`;

const Label = styled.label`
  font-size: 16px;
  color: rgba(80,80,80,.25);
`;

const Warn = styled.p`
  margin-top: -5px;
  height: 10px;
  font-size: 14px;
  font-weight: 200;
  color: red;
  text-align: center;
`;

const Disabled = styled.input`
  width: 295px;
  height: 50px;
  font-size: 16px;
  font-weight: 200;
  background: rgba(200, 200, 200, 1);
  color: white;
  border-radius: 5px;
  outline: none;
`;

const Button = styled.input`
  width: 295px;
  height: 50px;
  font-size: 16px;
  font-weight: 200;
  background: rgba(0, 40, 100, 1);
  color: white;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
`;

const Flink = styled.a`
  margin-right: 10px;
  text-decoration: none;
  font-size: 18px;
  font-weight: 200;
  color: blue;
  cursor: pointer;
`;

export default () => {

  const [ error, setError ] = useState(false)
  const [ fulfilled, setFulfilled ] = useState(false)
  const [ waiting, setWaiting ] = useState(false)

  const validateData = () => {
    const firstName = document.getElementById('first').value
    const lastName = document.getElementById('last').value
    let score = document.getElementById('score').value
    score = parseInt(score)
    if (firstName.length < 1 || typeof firstName !== 'string') {
      setError('please enter a first name')
      setTimeout(() => { setError(false)}, 1000)
      return
    }
    if (lastName.length < 1 || typeof lastName !== 'string') {
      setError('please enter a last name')
      setTimeout(() => { setError(false)}, 1000)
      return
    }
    if (!score || typeof score !== 'number') {
      setError('please enter a score')
      setTimeout(() => { setError(false)}, 1000)
      return
    }
    return { firstName, lastName, score }
  }

  return (
    <ApolloProvider client={client}>
      <AddPlayer>
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500" />
        </Head>

        <Mutation mutation={POST_PLAYER}>
          {(postPlayer, { data }) => (
            <Form
              onSubmit={
                async e => {
                  e.preventDefault();
                  setWaiting(true)
                  let data = await validateData()
                  if (data) {
                    await postPlayer({ variables: { ...data }})
                    .then(fulfilled => {
                      setFulfilled(fulfilled.data.postPlayer)
                    })
                    .catch(rejected => console.log(rejected))
                  } else {
                    setWaiting(false)
                  }
                }
              }
            >
              {fulfilled ?
                <div>
                  <h2>Player saved</h2>
                  <p>Name: {fulfilled.lastName}, {fulfilled.firstName}</p>
                  <p>Score {fulfilled.score}</p>
                  <Flink onClick={() => setFulfilled(false)}>Enter another player</Flink><br />
                  <Flink href='/'>Go to Leaderboard</Flink>
                </div>
                :
                <div>
                  <h2>Add player data:</h2>
                  <Label>First Name:</Label> <br />
                  <In id='first' type='text' placeholder='first name'/> <br />
                  <Label>Last Name:</Label> <br />
                  <In id='last' type='text' placeholder='last name' /> <br />
                  <Label>Score:</Label> <br />
                  <In id='score' type='text' placeholder='enter score' /> <br />
                  <Warn>{error}</Warn>
                  {waiting ?
                    <Disabled type='button' value='add player' />
                    : <Button type='submit' value='add player' />
                  }

                </div>
              }

            </Form>
          )}
        </Mutation>

      </AddPlayer>
    </ApolloProvider>
  )
}
