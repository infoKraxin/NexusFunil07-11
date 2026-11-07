export const CAKTO_URLS = {
  primary: 'https://pay.kirvano.com/9d292f07-2dac-43f6-a73d-1b304a68d208',
  primaryCommunity: 'https://pay.kirvano.com/5b2c17ed-fb9c-493e-9c7c-ab621c247e96',
  focuz: 'https://pay.kirvano.com/36d84b1c-2acc-4453-9406-57d8039a3008',
  focuzCommunity: 'https://pay.kirvano.com/8770d5d5-c837-4df6-a73c-a8dbf44d64a1',
  intensive: 'https://pay.kirvano.com/5fa70276-0201-4501-9a17-539986f630c6',
  intensiveCommunity: 'https://pay.kirvano.com/f8b9e7bd-44f8-43ef-94c5-02954a390007',
  backredirect: 'https://pay.kirvano.com/aa17dad7-e1b8-4238-9a10-803502584266',
} as const

export type PlanId = 'primary' | 'focuz' | 'intensive'

export function getCheckoutUrl(planId: PlanId, withCommunity: boolean) {
  const key: keyof typeof CAKTO_URLS = withCommunity ? `${planId}Community` : planId
  return CAKTO_URLS[key]
}
