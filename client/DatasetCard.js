import * as React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Checkbox from '@mui/material/Checkbox'

const Root = styled('div')(({ theme }) => ({
  '&': {
    textAlign: 'center',
    paddingTop: theme.spacing(2),
  },
}))

const Container = styled(Card)(({ theme }) => ({
  '&': {
    width: '480px',
    margin: `${theme.spacing(4)} auto`,
    ['@media (max-width:780px)']: {
      width: '100%',
    },
    textAlign: 'left',
    padding: theme.spacing(4),
  },
}))

const DatasetCard = ({ name, properties, urn, tags: rawTags}) => {
  const tags = rawTags?.tags ?? []
  console.log(tags)
  const { description, externalUrl } = properties ?? {}
  return (
    <Root>
      <Container>
        <Typography variant="h4"><Checkbox/>{name}</Typography>
        <CardContent>
          {description ? <React.Fragment>
            <Typography variant="h6">Description:</Typography>
            <Typography>{description}</Typography>
          </React.Fragment> : null}
          {externalUrl ? <React.Fragment>
            <Typography variant="h6">External URL:</Typography>
            <Typography>{externalUrl}</Typography>
          </React.Fragment> : null}
          {urn ? <React.Fragment>
            <Typography variant="h6">URN:</Typography>
            <Typography>{urn}</Typography>
          </React.Fragment> : null}
          {tags.length > 0 ? <React.Fragment>
            <br/>
            <Divider/>
            <br/>
            <Stack direction="row" spacing={1}>
              {tags.map(({ tag: {name,urn} }) => (
              <Chip key={urn} label={name} variant="outlined" />
              ))}
            </Stack>
          </React.Fragment> : null}
        </CardContent>
      </Container>
    </Root>
  )
}

export default DatasetCard
