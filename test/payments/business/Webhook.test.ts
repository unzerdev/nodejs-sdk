import Unzer from '../../../src/Unzer'
import * as TestHelper from '../../helpers/TestHelper'
import Webhook from '../../../src/payments/business/Webhook'

describe('Webhook test', () => {
  let unzer: Unzer

  const { createEventWebhookPayload, createEventListWebhookPayload } = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createHeidelpayInstance()
  })

  it('Test register webhook with eventList', async () => {
    const payload = createEventListWebhookPayload(['authorize', 'charge', 'types', 'customer.updated'])
    const webhook: Webhook = await unzer.registerWebhook(payload)

    expect(webhook).toBeInstanceOf(Webhook)
    expect(webhook.getEventList()).toBeDefined()
    expect(webhook.getUrl()).not.toBeDefined()
    expect(webhook.getEvent()).not.toBeDefined()
  })

  it('Test register webhook with only one event', async () => {
    const payload = createEventListWebhookPayload(['authorize'])
    const webhook: Webhook = await unzer.registerWebhook(payload)

    expect(webhook).toBeInstanceOf(Webhook)
    expect(webhook.getEventList()).not.toBeDefined()
    expect(webhook.getUrl()).toBeDefined()
    expect(webhook.getEvent()).toBeDefined()
    expect(webhook.getEvent()).toBe('authorize')
  })

  it('Test register webhook with all events', async () => {
    const webhook: Webhook = await unzer.registerWebhook(createEventWebhookPayload())

    expect(webhook).toBeInstanceOf(Webhook)
    expect(webhook.getEvent()).toBeDefined()
    expect(webhook.getEvent()).toBe('all')
    expect(webhook.getId()).toBeDefined()
    expect(webhook.getUrl()).toBeDefined()
    expect(webhook.getEventList()).not.toBeDefined()
  })

  it('Test fetch webhook with all events', async () => {
    const webhook: Webhook = await unzer.registerWebhook(createEventWebhookPayload())
    const webhookId = webhook.getId()
    const fetchedWebhook = await unzer.fetchWebhook(webhookId)

    expect(fetchedWebhook).toBeInstanceOf(Webhook)
    expect(fetchedWebhook.getEvent()).toBeDefined()
    expect(fetchedWebhook.getId()).toBeDefined()
    expect(fetchedWebhook.getUrl()).toBeDefined()
    expect(fetchedWebhook.getEventList()).not.toBeDefined()
  })

  it('Test fetch webhook for single event', async () => {
    const payload = createEventListWebhookPayload(['authorize', 'charge', 'types'])
    const webhook: Webhook = await unzer.registerWebhook(payload)

    expect(webhook.getEventList()).toBeDefined()
    expect(webhook.getEvent()).not.toBeDefined()

    const webhookId = webhook.getIdByEventName('authorize')
    const fetchedWebhook = await unzer.fetchWebhook(webhookId)

    expect(fetchedWebhook).toBeInstanceOf(Webhook)
    expect(fetchedWebhook.getEvent()).toBeDefined()
    expect(fetchedWebhook.getId()).toBeDefined()
    expect(fetchedWebhook.getUrl()).toBeDefined()
    expect(fetchedWebhook.getEventList()).not.toBeDefined()
  })

  it('Test fetching url from a single event inside eventList', async () => {
    const payload = createEventListWebhookPayload(['authorize', 'charge', 'types'])
    const webhook: Webhook = await unzer.registerWebhook(payload)
    const webhookUrl = webhook.getUrlByEventName('authorize')
    
    expect(webhookUrl).toBeDefined()
  })

  it('Test delete webhook with all events by using webhook id', async () => {
    const webhook: Webhook = await unzer.registerWebhook(createEventWebhookPayload())
    const webhookId = webhook.getId()
    const deletedWebhook = await unzer.deleteWebhook(webhookId)

    expect(deletedWebhook).not.toBeInstanceOf(Webhook)
    expect(typeof deletedWebhook).toBe('string')
    expect(deletedWebhook).toEqual(webhookId)

  })

  it('Test delete webhook with all events without using webhook id', async () => {
    await unzer.registerWebhook(createEventWebhookPayload())
    const deletedWebhook = await unzer.deleteWebhook()

    expect(deletedWebhook).not.toBeInstanceOf(Webhook)
    expect(deletedWebhook.length).toBeGreaterThanOrEqual(1)
  })

  it('Test delete webhook with some events', async () => {
    await unzer.deleteWebhook()
    const payload = createEventListWebhookPayload(['authorize', 'charge', 'types'])
    const webhook: Webhook = await unzer.registerWebhook(payload)
    const webhookId = webhook.getIdByEventName('authorize')
    const deletedWebhook = await unzer.deleteWebhook(webhookId)

    expect(deletedWebhook).not.toBeInstanceOf(Webhook)
    expect(typeof deletedWebhook).toBe('string')
    expect(deletedWebhook).toEqual(webhookId)

    const fetchedAllRegisteredWebhooks = await unzer.fetchWebhook()
    const currentEvents = fetchedAllRegisteredWebhooks.getEventList()

    expect(currentEvents.length).toBe(2)
  })

  it('Test update url for event all', async () => {
    const webhook: Webhook = await unzer.registerWebhook(createEventWebhookPayload())
    const webhookId = webhook.getId()

    const oldWebhookUrl = webhook.getUrl()
    const updatedWebhook = await unzer.updateWebhook(
      webhookId,
      { url: `https://unzer.com/${Date.now()}` },
    )

    expect(updatedWebhook).toBeInstanceOf(Webhook)
    expect(updatedWebhook.getEvent()).toBeDefined()
    expect(updatedWebhook.getId()).toBeDefined()
    expect(updatedWebhook.getUrl()).toBeDefined()
    expect(updatedWebhook.getUrl()).not.toEqual(oldWebhookUrl)
    expect(updatedWebhook.getEventList()).not.toBeDefined()
  })

  it('Test update url for one event', async () => {
    const payload = createEventListWebhookPayload(['authorize'])
    const webhook: Webhook = await unzer.registerWebhook(payload)
    const webhookId = webhook.getId()

    const oldWebhookUrl = webhook.getUrl()
    const updatedWebhook = await unzer.updateWebhook(
      webhookId,
      { url: `https://unzer.com/${Date.now()}` },
    )

    expect(updatedWebhook).toBeInstanceOf(Webhook)
    expect(updatedWebhook.getEvent()).toBeDefined()
    expect(updatedWebhook.getId()).toBeDefined()
    expect(updatedWebhook.getUrl()).toBeDefined()
    expect(updatedWebhook.getUrl()).not.toEqual(oldWebhookUrl)
    expect(updatedWebhook.getEventList()).not.toBeDefined()
  })


  it('Test update url for multiple events', async () => {
    const payload = createEventListWebhookPayload(['authorize', 'charge'])
    const webhook: Webhook = await unzer.registerWebhook(payload)
    const webhookId = webhook.getIdByEventName('authorize')
    const oldWebhookUrl = webhook.getUrl()
    const updatedWebhook = await unzer.updateWebhook(
      webhookId,
      { url: `https://unzer.com/${Date.now()}` },
    )

    expect(updatedWebhook).toBeInstanceOf(Webhook)
    expect(updatedWebhook.getEvent()).toBeDefined()
    expect(updatedWebhook.getId()).toBeDefined()
    expect(updatedWebhook.getUrl()).toBeDefined()
    expect(updatedWebhook.getUrl()).not.toEqual(oldWebhookUrl)
    expect(updatedWebhook.getEventList()).not.toBeDefined()
  })
})