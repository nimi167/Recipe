import { render, screen, configure } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

configure({ testIdAttribute: "id" })

jest.mock('@react-oauth/google', () => ({
    GoogleLogin: ({ onSuccess }) => (
        <button onClick={onSuccess}>Google Login</button>
    )
}));

test('login form test', () => {
    render(
        <Router>
            <LoginForm />
        </Router>
    );
    const linkElement = screen.getByText(/Welcome Back!/i);
    const btn = screen.getByRole("button", { name: "Login" });
    const Email = screen.getByPlaceholderText("Enter Email")
    const Password = screen.getByPlaceholderText("Enter Password")
    const SignUp = screen.getByTestId("SignUp")

    const btns = screen.getAllByRole("button")
    expect(linkElement).toBeInTheDocument();
    expect(Email).toBeInTheDocument();
    expect(Password).toBeInTheDocument();
    expect(SignUp).toBeInTheDocument();

    expect(btn).toBeInTheDocument()
    for (let i = 0; i < btn.length; i++) {
        expect(btns[i]).toBeInTheDocument()
    }
});
