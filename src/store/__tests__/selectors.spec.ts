import type { Advert } from '../../pages/adverts/types';
import type { RootState } from '../index';
import { getAdvertSelector } from '../selectors';

describe('getAdvertSelector', () => {
    const advert: Advert = {id: "1", name: "", price: 0, sale: false, tags:[]}
    const state: RootState = {
        adverts: {data: [advert], loaded: true},
        auth: false,
        ui: { pending: false, error: null },
        tags: {loaded: true, data: [""]}
    }

    test('should return an advert with id 1', () => {
        const result = getAdvertSelector("1")(state)
        expect(result).toBe(advert)
    })

    test('should return undefined', () => {
        const result = getAdvertSelector("2")(state)
        expect(result).toBeUndefined()
    })
})