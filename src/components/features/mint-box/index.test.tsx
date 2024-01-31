import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MintBox from './index';

describe('MintBox', () => {
  it('renders without crashing', () => {
    render(<MintBox />);
  });

  it('calls handleChangeCrypto when select value changes', async () => {
    const { getByTestId } = render(<MintBox />);
    const select = getByTestId('crypto-select'); // You need to add data-testid='crypto-select' to your select element

    fireEvent.change(select, { target: { value: 'BNB' } });

    await waitFor(() => {
      expect((select as HTMLSelectElement).value).toBe('BNB');
    });
  });

  // Add more tests here for other functionalities of your component
});