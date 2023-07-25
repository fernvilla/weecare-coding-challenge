import { describe, test, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Hero from './Hero';
import { renderWithClient } from '../../test/utils';

describe('Hero test', () => {
  test('Should show headline text', () => {
    renderWithClient(<Hero />);

    const heading = screen.getByRole('heading', {
      name: /harmonize your world/i
    });

    expect(heading).toBeDefined();
  });
});
