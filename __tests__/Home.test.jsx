import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "../src/pages/Home/index";
import { renderWrapper, TestRouter } from "./utils/test-utils";
import Search from "../src/pages/Home/Search";
import Trending from "../src/pages/Home/Trending";
import Recommendation from "../src/pages/Home/Recommendation";
import Discover from "../src/pages/Discover";
import Layout from "../src/layout";
import Detail from "../src/pages/Detail";

describe('Home', () => {
    it('match snapshot', async () => {
        renderWrapper(<Home title='The Movie DB' />);
        expect(await waitFor(() => screen)).toMatchSnapshot();
    });

    it('should render header and its elements', () => {
        render(
            <TestRouter
                initialRoute='/'
                routes={[
                    { path: '/', element: <Layout><Home /></Layout> }
                ]}
            />
        );
        expect(screen.getAllByAltText('Movie DB Logo')).toBeDefined();
        expect(screen.getAllByRole('link', { name: 'Movies' })).toBeDefined();
        expect(screen.getAllByRole('link', { name: 'TV Series' })).toBeDefined();
        expect(screen.getAllByRole('link', { name: 'People' })).toBeDefined();
        expect(screen.getByRole('link', { name: 'Register' })).toBeDefined();
        expect(screen.getByRole('link', { name: 'Login' })).toBeDefined();
    });

    it('should render search section', () => {
        render(
            <TestRouter
                initialRoute='/'
                routes={[
                    { path: '/', element: <Layout><Search /></Layout> }
                ]}
            />
        );
        expect(screen.getByText('Discover Your Favorite Movies and TV Series with Ease')).toBeDefined();
        expect(screen.getByPlaceholderText('Search for movies or tv series')).toBeDefined();
    });

    it('should render trending section', async () => {
        render(
            <TestRouter
                initialRoute='/'
                routes={[
                    { path: '/', element: <Layout><Trending /></Layout> }
                ]}
            />
        );
        expect(screen.getByRole('heading', { level: 2, name: 'Trending' })).toBeDefined();
        expect(screen.getByRole('button', { name: 'Today' })).toBeDefined();
        expect(screen.getByRole('button', { name: 'This Week' })).toBeDefined();

        const posters = await screen.findAllByAltText(/.* poster$/i);

        expect(posters).toBeDefined();
        expect(posters.length).toBeGreaterThanOrEqual(4);
    });

    it('should render recommendation section', async () => {
        render(
            <TestRouter
                initialRoute='/'
                routes={[
                    { path: '/', element: <Layout><Recommendation /></Layout> }
                ]}
            />
        );
        
        expect(screen.getByRole('heading', { level: 2, name: 'You Might Like These Movies or Series' })).toBeDefined();

        const posters = await screen.findAllByAltText(/.* poster$/i);
        
        expect(posters).toBeDefined();
        expect(posters.length).toBe(4);
    });

    it('should direct to movie detail page', async () => {
        render(
            <TestRouter
                initialRoute='/'
                routes={[
                    { path: '/', element: <Home /> },
                    { path: '/:mediaType/:idName', element: <Detail /> }
                ]}
            />
        );
        const posters = await screen.findAllByAltText(/.* poster$/i)
        fireEvent.click(posters[0]);
        
        expect(await screen.findByAltText('Backdrop Image')).toBeDefined();
        expect(await screen.findByRole('button', { name: 'Add to Favorite' })).toBeDefined();
        expect(await screen.findByRole('button', { name: 'Visit Page' })).toBeDefined();
        expect(await screen.findByRole('heading', { name: 'You Also Might Like These' })).toBeDefined();
        expect(await screen.findByRole('heading', { name: 'Reviews' })).toBeDefined();

        
        const recommendation = await screen.findAllByAltText(/.* poster$/i);
        expect(recommendation).toBeDefined();
        expect(recommendation.length).toBe(5);
        
    });

    it('should direct to search page after submiting query', async () => {
        render(
            <TestRouter
                initialRoute='/'
                routes={[
                    { path: '/', element: <Layout><Home /></Layout> },
                    { path: '/discover', element: <Layout><Discover /></Layout> }
                ]}
            />
        );
        const searchBar = screen.getByPlaceholderText('Search for movies or tv series');

        fireEvent.change(searchBar, { target: { value: 'Moana' } });
        fireEvent.keyUp(searchBar, { key: 'Enter', code: 'Enter' });

        expect(await screen.findByRole('heading', { level: 1, name: 'Discover: Moana' })).toBeDefined();
    });
})