import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResponseError from '../components/response-error/response-error.tsx';

describe('ResponseError', () => {
  it('Should display the error message', () => {
    const code = 404;
    const message = 'Something went wrong';
    render(<ResponseError status={code} message={message} />);

    const status = screen.getByText(/Status code/);
    const messageElem = screen.getByText(message);

    expect(status.textContent?.includes(code.toString())).toBeTruthy();
    expect(messageElem).toBeInTheDocument();
  });
});
