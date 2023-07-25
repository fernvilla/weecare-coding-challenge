import { describe, test, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Album from './Album';
import { renderWithProviders } from '../../test/utils';
import album, { image } from '../../test/data/album';

describe('Album test', () => {
  test('Should show album name', () => {
    renderWithProviders(<Album album={album} onAlbumSelect={() => {}} albumIndex={0} />);

    const heading = screen.getAllByLabelText(album['im:name'].label);

    expect(heading).toBeDefined();
  });

  test('Should show artist name', () => {
    renderWithProviders(<Album album={album} onAlbumSelect={() => {}} albumIndex={0} />);

    const heading = screen.getByText(album['im:artist'].label);

    expect(heading).toBeDefined();
  });

  test('Should show album img', () => {
    renderWithProviders(<Album album={album} onAlbumSelect={() => {}} albumIndex={0} />);

    const imageEl = screen.getByAltText(album.title.label) as HTMLImageElement;

    expect(imageEl.src).toContain(image);
  });
});
