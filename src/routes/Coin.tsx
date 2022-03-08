import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import * as React from 'react';
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoins, fetchCoinTickers } from "../api";

interface RouteParams {
    coinId: string;
}
const Container = styled.div`
    padding: 0px 20px;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.textColor};
`;
const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

export interface IParent {
    id: string;
    name: string;
    symbol: string;
}

export interface ITag {
    id: string;
    name: string;
    coin_counter: number;
    ico_counter: number;
}

export interface ITeam {
    id: string;
    name: string;
    position: string;
}

export interface IContract {
    contract: string;
    platform: string;
    type: string;
}

export interface ILinks {
    explorer: string[];
    facebook: string[];
    reddit: string[];
    source_code: string[];
    website: string[];
    youtube: string[];
    medium?: any;
}

export interface IStats {
    subscribers: number;
    contributors?: number;
    stars?: number;
}

export interface ILinksExtended {
    url: string;
    type: string;
    stats: IStats;
}

export interface IWhitepaper {
    link: string;
    thumbnail: string;
}
interface IInfoData {
    id: string;
    name: string;
    symbol: string;
    parent: IParent;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    tags: ITag[];
    team: ITeam[];
    description: string;
    message: string;
    open_source: boolean;
    hardware_wallet: boolean;
    started_at: Date;
    development_status: string;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    contract: string;
    platform: string;
    contracts: IContract[];
    links: ILinks;
    links_extended: ILinksExtended[];
    whitepaper: IWhitepaper;
    first_data_at: Date;
    last_data_at: Date;
}

export interface IBTC {
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_15m: number;
    percent_change_30m: number;
    percent_change_1h: number;
    percent_change_6h: number;
    percent_change_12h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    percent_change_30d: number;
    percent_change_1y: number;
    ath_price?: any;
    ath_date?: any;
    percent_from_price_ath?: any;
}

export interface IUSD {
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_15m: number;
    percent_change_30m: number;
    percent_change_1h: number;
    percent_change_6h: number;
    percent_change_12h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    percent_change_30d: number;
    percent_change_1y: number;
    ath_price: number;
    ath_date: Date;
    percent_from_price_ath: number;
}

export interface IQuotes {
    BTC: IBTC;
    USD: IUSD;
}

interface IPriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: Date;
    last_updated: Date;
    quotes: IQuotes;
}

interface RouteState {
    name: string;
}

function Coin() {
    const { coinId } = useParams<RouteParams>();
    const { state } = useLocation<RouteState>();
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/coinId/chart");

    const {isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(["info", coinId], () => fetchCoinInfo(coinId))
    const {isLoading: tickersLoading, data: tickersData} = useQuery<IPriceData>(["tickers", coinId], 
    () => fetchCoinTickers(coinId),
    {
        refetchInterval: 5000,
    }
    )
    const loading = infoLoading || tickersLoading;
    
    return (<Container>
        <Header></Header>
        <Title>{state?.name ? state.name : loading ? "Loading.." : infoData?.name}</Title>
        {loading ? (
            <Loader>Loading...</Loader>
        ) : (
            <>
                <Overview>
                    <OverviewItem>
                        <span>Rank:</span>
                        <span>{infoData?.rank}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Symbol:</span>
                        <span>${infoData?.symbol}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Price</span>
                        <span>$ {tickersData?.quotes.USD.price.toFixed(2)}</span>
                    </OverviewItem>
                </Overview>
                <Description>{infoData?.description}</Description>
                <Overview>
                    <OverviewItem>
                        <span>Total Suply:</span>
                        <span>{tickersData?.total_supply}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Max Supply:</span>
                        <span>{tickersData?.max_supply}</span>
                    </OverviewItem>
                </Overview>

               
                <Tabs>
                    <Tab isActive={chartMatch !== null}>
                        <Link to={`/${coinId}/chart`}>Chart</Link>
                    </Tab>
                    <Tab isActive={priceMatch !== null}>
                        <Link to={`/${coinId}/price`}>Price</Link>
                    </Tab>
                </Tabs>


                <Switch>
                    <Route path={`/:coinId/price`}>
                        <Price />
                    </Route>
                    <Route path={`/:coinId/chart`}>
                        <Chart coinId={coinId} />
                    </Route>
                </Switch>
            </>
        )}
    </Container>)
}
export default Coin;