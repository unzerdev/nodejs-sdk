import AbstractPayment from './AbstractPayment'
import Unzer from '../../Unzer'
import Resources from './Resources'

export default class Webhook extends AbstractPayment  {
  private url: string
  private event: string
  private eventList: Array<any>
  private resources: Resources

  constructor(unzer: Unzer) {
    super(unzer)
    this.resources = new Resources()
  }

  /**
   * Get Url
   *
   * @returns {string}
   */
  public getUrl(): string {
    return this.url
  }

  /**
   * Set Url
   *
   * @param {string} url
   */
  public setUrl(url: string) {
    this.url = url
  }

  /**
   * Get Event
   *
   * @returns {string}
   */
  public getEvent(): string {
    return this.event
  }

  /**
   * Set Event
   *
   * @param {string} event
   */
  public setEvent(event: string) {
    this.event = event
  }

  /**
   * Get EventList
   *
   * @returns {Array<any>}
   */
  public getEventList(): Array<any> {
    return this.eventList
  }

  /**
   * Set Event
   *
   * @param {Array<string>} eventList
   */
  public setEventList(eventList: Array<any>) {
    this.eventList = eventList
  }

  /**
   * Get resources
   *
   * @returns {Resources}
   */
  public getResources(): Resources {
    return this.resources
  }

  /**
   * Get id by event name
   *
   * @param {string} event
   * @returns {string}
   */
  public getIdByEventName(event: string): string {
    if (this.eventList.length === 0) {
      return 'Event list does not exist'
    }
    const filteredEvent = this.eventList.filter(listEvent => listEvent.event === event)
     if (filteredEvent.length === 0) {
      return 'Passed event has not been registered'
    }
    return filteredEvent[0].id
  }

  /**
   * Get url by event name
   *
   * @param {string} event
   * @returns {string}
   */
  public getUrlByEventName(event: string): string {
    if (this.eventList.length === 0) {
      return 'Event list does not exist'
    }
    const filteredEvent = this.eventList.filter(listEvent => listEvent.event === event)
    if (filteredEvent.length === 0) {
      return 'Passed event has not been registered'
    }
    return filteredEvent[0].url
  }
}

export type webhookObject = {
  url: string
  event?: string
  eventList?: Array<string>
}