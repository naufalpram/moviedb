/* eslint-disable react-refresh/only-export-components */
import { render } from "@testing-library/react";
import App from "../../src/App"
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryProvider } from "../../src/store/query";

const AppWrapper = ({ children }) => {
    return <App>{children}</App>
};

export const renderWrapper = (ui, options) => {
    render(ui, { wrapper: AppWrapper, ...options });
};

export const TestRouter = ({initialRoute, routes, ...props}) => {

    const routerProps = initialRoute ? {
      initialIndex: 0,
      initialEntries: [initialRoute],
    } : {};
  
    return (
        <QueryProvider>
            <MemoryRouter {...routerProps} {...props}>
                <Routes>
                    {routes.map((route, idx) => <Route key={idx} path={route.path} element={route.element} />)}
                </Routes>
            </MemoryRouter>
        </QueryProvider>
    );
}
