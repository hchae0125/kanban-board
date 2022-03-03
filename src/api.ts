const BASE_URL = `https://api.coinpaprika.com/v1`;
export function fetchCoins () {
    return fetch(`${BASE_URL}/coins`).then(response => {
        return response.json();
    });
}

export function fetchCoinInfo(coinId: string) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then(response => {
        return response.json();
    });
}

export function fetchCoinTickers(coinId: string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then(response => {
        return response.json();
    });
}

