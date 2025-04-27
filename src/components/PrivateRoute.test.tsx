import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { vi } from 'vitest';  

describe("PrivateRoute", () => {
  it("should render children when authenticated", () => {
    // Mock localStorage.getItem to return a token
    Storage.prototype.getItem = vi.fn(() => 'mocked_token');  

    render(
      <MemoryRouter initialEntries={["/private"]}>
        <Routes>
          <Route
            path="/private"
            element={<PrivateRoute element={<div>Private Content</div>} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Private Content")).toBeInTheDocument();
  });

  it("should redirect to login when not authenticated", () => {
    // Mock localStorage.getItem to return null (not authenticated)
    Storage.prototype.getItem = vi.fn(() => null);  

    render(
      <MemoryRouter initialEntries={["/private"]}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route
            path="/private"
            element={<PrivateRoute element={<div>Private Content</div>} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});
