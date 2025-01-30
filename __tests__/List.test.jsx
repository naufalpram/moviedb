import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWrapper, TestRouter } from "./utils/test-utils";
import Layout from "../src/layout";
import Detail from "../src/pages/Detail";
import List from "../src/pages/List";

describe('List movies, series, and people', () => {
    it('match snapshot', async () => {
        renderWrapper(<List title='The Movie DB' />);
        expect(await waitFor(() => screen)).toMatchSnapshot();
    });

    it('should render list movies page', async () => {
        render(
            <TestRouter
                initialRoute='/movie'
                routes={[
                    { path: '/:mediaType', element: <Layout><List /></Layout> },
                ]}
            />
        );

        
        const posters = await screen.findAllByAltText(/.* poster$/i);

        expect(screen.getByRole('heading', { level: 1, name: 'Find Movies' })).toBeDefined();
        expect(screen.getByPlaceholderText('Search a movie')).toBeDefined();
        
        expect(posters).toBeDefined();
        expect(posters.length).toBe(20);
    });
    
    it('should render list tv series page', async () => {
        render(
            <TestRouter
                initialRoute='/tv'
                routes={[
                    { path: '/:mediaType', element: <Layout><List /></Layout> },
                ]}
            />
        );

        
        const posters = await screen.findAllByAltText(/.* poster$/i);

        expect(screen.getByRole('heading', { level: 1, name: 'Find TV Series' })).toBeDefined();
        expect(screen.getByPlaceholderText('Search a tv series')).toBeDefined();
        
        expect(posters).toBeDefined();
        expect(posters.length).toBe(20);
    });
    
    it('should render list people page', async () => {
        render(
            <TestRouter
                initialRoute='/person'
                routes={[
                    { path: '/:mediaType', element: <Layout><List /></Layout> },
                ]}
            />
        );

        
        const posters = await screen.findAllByAltText(/.* poster$/i);

        expect(screen.getByRole('heading', { level: 1, name: 'Find People' })).toBeDefined();
        expect(screen.getByPlaceholderText('Search a person')).toBeDefined();
        
        expect(posters).toBeDefined();
        expect(posters.length).toBe(20);
    });

    it('should find movies by submiting query', async () => {
        render(
            <TestRouter
                initialRoute='/movie'
                routes={[
                    { path: '/:mediaType', element: <Layout><List /></Layout> },
                ]}
            />
        );
        const searchBar = screen.getByPlaceholderText('Search a movie');

        fireEvent.change(searchBar, { target: { value: 'Moana' } });
        fireEvent.keyUp(searchBar, { key: 'Enter', code: 'Enter' });

        expect(await screen.findByRole('heading', { level: 1, name: 'Find Movies: Moana' })).toBeDefined();
    });

    it('should find tv series by submiting query', async () => {
        render(
            <TestRouter
                initialRoute='/tv'
                routes={[
                    { path: '/:mediaType', element: <Layout><List /></Layout> },
                ]}
            />
        );
        const searchBar = screen.getByPlaceholderText('Search a tv series');

        fireEvent.change(searchBar, { target: { value: 'Friends' } });
        fireEvent.keyUp(searchBar, { key: 'Enter', code: 'Enter' });

        expect(await screen.findByRole('heading', { level: 1, name: 'Find TV Series: Friends' })).toBeDefined();
    });

    it('should find people by submiting query', async () => {
        render(
            <TestRouter
                initialRoute='/person'
                routes={[
                    { path: '/:mediaType', element: <Layout><List /></Layout> },
                ]}
            />
        );
        const searchBar = screen.getByPlaceholderText('Search a person');

        fireEvent.change(searchBar, { target: { value: 'Jason' } });
        fireEvent.keyUp(searchBar, { key: 'Enter', code: 'Enter' });

        expect(await screen.findByRole('heading', { level: 1, name: 'Find People: Jason' })).toBeDefined();
    });

    it('should direct to movie detail page', async () => {
        render(
            <TestRouter
                initialRoute='/movie'
                routes={[
                    { path: '/:mediaType', element: <List /> },
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

    it('should direct to tv series detail page', async () => {
        render(
            <TestRouter
                initialRoute='/tv'
                routes={[
                    { path: '/:mediaType', element: <List /> },
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

    it('should direct to people detail page', async () => {
        render(
            <TestRouter
                initialRoute='/person'
                routes={[
                    { path: '/:mediaType', element: <List /> },
                    { path: '/:mediaType/:idName', element: <Detail /> }
                ]}
            />
        );
        const posters = await screen.findAllByAltText(/.* poster$/i)
        fireEvent.click(posters[0]);
        
        expect(await screen.findByAltText('Poster Image')).toBeDefined();
        expect(await screen.findByRole('heading', { name: 'Known For These Movies' })).toBeDefined();
        expect(await screen.findByRole('heading', { name: 'Known For These Series' })).toBeDefined();
        
        const recommendation = await screen.findAllByAltText(/.* poster$/i);
        expect(recommendation).toBeDefined();
        
    });
})