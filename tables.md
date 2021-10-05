One-Time Sale vs. Subscription

= category
id: UUID
name: TEXT

= publicator
id
name
description
contacts

= datasets
id: UUID
publicatorId: UUID
title: TEXT
description: TEXT
categoryId: UUID
format: 'xml/rdf', 'csv', json
viewCount: int
downloadCount: int
releases: JSONB Array<{ releasedAt, releaseId }>
contacts: TEXT
structure: {
fieldName: text,
description?: text
englishDescription?: text,
russianDescription?: text,
format?: text
}
subscriptionPrice
oneTimeSalePrice

= comments
datasetId: UUID
commentId: UUID
parentId: UUID
text: TEXT
