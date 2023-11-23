import React from 'react'
import prisma from '@/src/lib/prisma'

const Home = () => {
  prisma.$queryRaw`CREATE DATABASE keycloak`
    .then((keycloak) => {
      console.debug('Execute keycloak: ' + keycloak)
    })
    .catch((e) => {
      console.error(
        'Failed when creating keycloak database, maybe the database exists: ' +
          e
      )
    })
  prisma.$queryRaw`CREATE DATABASE fullstack`
    .then((fullstack) => {
      console.debug('Execute fullstack: ' + fullstack)
    })
    .catch((e) => {
      console.error(
        'Failed when creating fullstack database, maybe the database exists: ' +
          e
      )
    })
  return <></>
}

export default Home
