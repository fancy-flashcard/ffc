export interface Deck {
    id: number,
    selected: boolean,
    name: string,
    meta: {
        file: object,
        deck: object
    },
    cards: Card[],
}

export interface Card {
    id: number,
    q: string,
    a: string,
    r?: Rating[],
}

export interface Rating {
    t: number,
    r: number,
}