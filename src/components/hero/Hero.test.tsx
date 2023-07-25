import { describe, test, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Hero from './Hero';
import { renderWithProviders } from '../../test/utils';

describe('Hero test', () => {
  test('Should show headline text', () => {
    renderWithProviders(<Hero />);

    const heading = screen.getByRole('heading', {
      name: /harmonize your world/i,
    });

    expect(heading).toBeDefined();
  });
});
