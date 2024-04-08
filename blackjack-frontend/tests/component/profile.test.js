import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Profile from '../../src/components/profile';

describe('Profile Component', () => {
    it('renders the skeleton loader when isLoading is true', () => {
      render(<Profile isLoading={true} />);
      const skeletonImage = screen.getByTestId('skeleton-loader-image');
      const skeletonName = screen.getByTestId('skeleton-loader-name');
      const skeletonLevel = screen.getByTestId('skeleton-loader-level');
      expect(skeletonImage).toBeInTheDocument();
      expect(skeletonName).toBeInTheDocument();
      expect(skeletonLevel).toBeInTheDocument();
    });
  
    it('renders profile details correctly', () => {
      const name = 'Matheus Morcinek';
      const imageUrl = 'https://github.com/matheusmorcinek.png';
      const level = 5;
      render(<Profile isLoading={false} name={name} imageUrl={imageUrl} level={level} />);
      expect(screen.getByAltText('Profile photo')).toHaveAttribute('src', imageUrl);
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(`Level ${level}`)).toBeInTheDocument();
    });
  
    it('uses default values for name, imageUrl, and level when not provided', () => {
      render(<Profile isLoading={false} />);
      expect(screen.getByAltText('Profile photo')).toHaveAttribute('src', 'https://github.com/matheusmorcinek.png');
      expect(screen.getByText('Matheus Morcinek')).toBeInTheDocument();
      expect(screen.getByText('Level 1')).toBeInTheDocument();
    });
  });