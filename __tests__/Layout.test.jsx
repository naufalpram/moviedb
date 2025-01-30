import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TestRouter } from "./utils/test-utils";
import Layout from "../src/layout";
import Login from "../src/pages/Auth/Login";
import Register from "../src/pages/Auth/Register";
import List from "../src/pages/List";

describe('Layout consisting of header and footer', () => {
    it('should direct to discover movies page', async () => {
        render(
            <TestRouter
                initialRoute='/'
                routes={[
                    { path: '/', element: <Layout /> },
                    { path: '/:mediaType', element: <List /> }
                ]}
            />
        );
        const moviesNav = screen.getAllByText('Movies');
        fireEvent.click(moviesNav[0]);
        expect(await screen.findByRole('heading', { level: 1, name: 'Find Movies' })).toBeDefined();
    });
    
    it('should direct to discover tv series page', async () => {
        render(
            <TestRouter
                initialRoute='/'
                routes={[
                    { path: '/', element: <Layout /> },
                    { path: '/:mediaType', element: <List /> }
                ]}
            />
        );
        const tvSeriesNav = screen.getAllByText('TV Series');
        fireEvent.click(tvSeriesNav[0]);
        expect(await screen.findByRole('heading', { level: 1, name: 'Find TV Series' })).toBeDefined();
    });
    
    it('should direct to discover people page', async () => {
        render(
            <TestRouter
                initialRoute='/'
                routes={[
                    { path: '/', element: <Layout /> },
                    { path: '/:mediaType', element: <List /> }
                ]}
            />
        );
        const peopleNav = screen.getAllByText('People');
        fireEvent.click(peopleNav[0]);
        expect(await screen.findByRole('heading', { level: 1, name: 'Find People' })).toBeDefined();
    });

    it('should direct to login page', async () => {
        render(
            <TestRouter
                initialRoute='/'
                routes={[
                    { path: '/', element: <Layout /> },
                    { path: '/login', element: <Login /> }
                ]}
            />
        );
        const loginButton = screen.getByRole('link', { name: 'Login'});
        fireEvent.click(loginButton);
        expect(await screen.findByRole('heading', { level: 2, name: 'Login' })).toBeDefined();
    });

    it('should direct to redirect page', async () => {
        render(
            <TestRouter
                initialRoute='/'
                routes={[
                    { path: '/', element: <Layout /> },
                    { path: '/register', element: <Register /> }
                ]}
            />
        );
        const registerButton = screen.getByRole('link', { name: 'Register'});
        fireEvent.click(registerButton);
        expect(await screen.findByText(/register/i)).toBeDefined();
    });
})