import Metadata from '../../src/payments/Metadata'
import Unzer from '../../src/Unzer'
import Charge from '../../src/payments/business/Charge'
import Authorization from '../../src/payments/business/Authorization'
import * as TestHelper from '../helpers/TestHelper'

describe('Metadata test', () => {
  let unzer: Unzer
  let createPaymentTypeCard
  const {createMetadataValue, getChargeWithMetadataId, getAuthorizationWithMetadataId} = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createHeidelpayInstance()
    createPaymentTypeCard = TestHelper.createPaymentTypeCard(unzer)
  })

  it('Test create metadata', async () => {
    const metadata: Metadata = await unzer.createMetadata(createMetadataValue())

    expect(metadata).toBeInstanceOf(Metadata)
    expect(metadata.getId()).toBeDefined()
  })
  
  it('Test create and fetch metadata', async () => {
    const metadataValue = createMetadataValue()
    const metadata: Metadata = await unzer.createMetadata(metadataValue)

    const fetchedMetadata: Metadata = await unzer.fetchMetadata(metadata.getId())

    expect(metadata).toBeInstanceOf(Metadata)
    expect(metadata.getId()).toBeDefined()
    expect(fetchedMetadata.getValue()).toEqual(metadataValue.getValue())
  })

  it('Test create metadata and charge', async () => {
    const metadataValue = createMetadataValue()
    const metadata: Metadata = await unzer.createMetadata(metadataValue)

    const card = await createPaymentTypeCard()
    const charge: Charge = await unzer.charge(getChargeWithMetadataId(card.getId(), metadata.getId()))

    expect(metadata).toBeInstanceOf(Metadata)
    expect(metadata.getId()).toBeDefined()
    expect(charge).toBeInstanceOf(Charge)
    expect(charge.getResources().getMetadataId()).toEqual(metadata.getId())
  })

  it('Test create metadata and authorize', async () => {
    const metadataValue = createMetadataValue()
    const metadata: Metadata = await unzer.createMetadata(metadataValue)

    const card = await createPaymentTypeCard()
    const authorize: Authorization = await unzer.authorize(getAuthorizationWithMetadataId(card.getId(), metadata.getId()))

    expect(metadata).toBeInstanceOf(Metadata)
    expect(metadata.getId()).toBeDefined()
    expect(authorize).toBeInstanceOf(Authorization)
    expect(authorize.getResources().getMetadataId()).toEqual(metadata.getId())
  })
})