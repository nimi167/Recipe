import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../components/HomePage';

// Mock window.scrollTo
window.scrollTo = jest.fn();

test('renders "Your Daily Dish" text', () => {
    const { getByText } = render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    );
    const dailyDishText = getByText('Your Daily Dish');
    const createNewRecipeButton = getByText('Create New Recipe');
    const TrendingTitle = getByText('Trending Recipes');
    const ExploreTitle = getByText('Explore Recipes');
    const connectTitle = getByText(/Let's Stay In Touch/i);
    const PopularTitle = getByText('Popular Category');

    expect(dailyDishText).toBeInTheDocument();
    expect(createNewRecipeButton).toBeInTheDocument();
    expect(TrendingTitle).toBeInTheDocument();
    expect(ExploreTitle).toBeInTheDocument();
    expect(connectTitle).toBeInTheDocument();
    expect(PopularTitle).toBeInTheDocument();
});